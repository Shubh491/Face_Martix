from flask import Flask, jsonify, request
import cv2
import dlib
import numpy as np
import os
from datetime import datetime
from pymongo import MongoClient
from threading import Thread


client = MongoClient("mongodb://localhost:27017/")
db = client["Facial_Recog"]
faces_collection = db["Faces"]
attendance_collection = db["Attendance"]
visitors_collection = db["Visitors"]  


MODEL_PATH_LANDMARKS = os.path.join(os.getcwd(), "shape_predictor_68_face_landmarks.dat")
MODEL_PATH_RECOGNITION = os.path.join(os.getcwd(), "dlib_face_recognition_resnet_model_v1.dat")

detector = dlib.get_frontal_face_detector()
predictor = dlib.shape_predictor(MODEL_PATH_LANDMARKS)
face_rec_model = dlib.face_recognition_model_v1(MODEL_PATH_RECOGNITION)


def get_face_encoding(image, face):
    shape = predictor(image, face)
    return np.array(face_rec_model.compute_face_descriptor(image, shape))

def euclidean_distance(encoding1, encoding2):
    return np.linalg.norm(np.array(encoding1) - np.array(encoding2))


app = Flask(__name__)


@app.route('/register_face', methods=['POST'])
def register_face():
    if 'image' not in request.files or 'name' not in request.form:
        return jsonify({"message": "Missing data"}), 400

    name = request.form['name']
    image_file = request.files['image']

    
    np_img = np.frombuffer(image_file.read(), np.uint8)
    frame = cv2.imdecode(np_img, cv2.IMREAD_COLOR)
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    faces = detector(gray)
    if len(faces) != 1:
        return jsonify({"message": "Ensure only one face is in the frame."}), 400

    encoding = get_face_encoding(frame, faces[0])

    
    faces_collection.insert_one({"name": name, "encoding": encoding.tolist()})
    return jsonify({"message": f"Face of {name} added successfully."})


@app.route('/live-recognition', methods=['GET'])
def live_face_recognition():
    global stop_recognition
    stop_recognition = False  

    def recognize_faces():
        global stop_recognition
        cap = cv2.VideoCapture(0)

        if not cap.isOpened():
            return jsonify({"message": "Error accessing webcam"}), 500

        known_faces = list(faces_collection.find())

        while not stop_recognition:
            ret, frame = cap.read()
            if not ret:
                break

            gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
            faces = detector(gray)

            for face in faces:
                encoding = get_face_encoding(frame, face)
                min_distance = float("inf")
                recognized_name = "Unknown"

                for entry in known_faces:
                    stored_encoding = np.array(entry["encoding"])
                    distance = euclidean_distance(encoding, stored_encoding)
                    if distance < min_distance and distance < 0.5:
                        min_distance = distance
                        recognized_name = entry["name"]
                        break

                x, y, w, h = (face.left(), face.top(), face.width(), face.height())
                cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 2)
                cv2.putText(frame, recognized_name, (x, y - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 255, 0), 2)

            cv2.imshow("Live Face Recognition", frame)

            if cv2.waitKey(1) & 0xFF == ord('q'):
                stop_recognition = True
                break

        cap.release()
        cv2.destroyAllWindows()

    
    Thread(target=recognize_faces, daemon=True).start()
    return jsonify({"message": "Live face recognition started."})


@app.route('/stop-recognition', methods=['GET'])
def stop_live_recognition():
    global stop_recognition
    stop_recognition = True  
    return jsonify({"message": "Live recognition stopped."})




@app.route('/mark_attendance', methods=['POST'])
def mark_attendance():
    if 'image' not in request.files:
        return jsonify({"message": "No image provided"}), 400

    image_file = request.files['image']
    np_img = np.frombuffer(image_file.read(), np.uint8)
    frame = cv2.imdecode(np_img, cv2.IMREAD_COLOR)
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    known_faces = list(faces_collection.find())

    faces = detector(gray)
    if len(faces) == 0:
        return jsonify({"message": "No face detected"}), 400

    recognized_name = "Unknown"
    for face in faces:
        encoding = get_face_encoding(frame, face)

        for entry in known_faces:
            stored_encoding = np.array(entry["encoding"])
            distance = euclidean_distance(encoding, stored_encoding)
            if distance < 0.25:
                recognized_name = entry["name"]
                break

    now = datetime.now()
    date_str = now.strftime("%Y-%m-%d")
    time_str = now.strftime("%H:%M:%S")

    if recognized_name != "Unknown":
        existing_entry = attendance_collection.find_one({"name": recognized_name, "date": date_str})

        if existing_entry:
            attendance_collection.update_one({"_id": existing_entry["_id"]}, {"$set": {"exit_time": time_str}})
        else:
            attendance_collection.insert_one({"name": recognized_name, "date": date_str, "entry_time": time_str, "exit_time": time_str})
        return jsonify({"message": f"Attendance marked for {recognized_name}."})

    
    visitor_entry = visitors_collection.find_one({"date": date_str, "image": np_img.tolist()})
    if not visitor_entry:
        visitors_collection.insert_one({"date": date_str, "image": np_img.tolist(), "time": time_str})
        return jsonify({"message": "Face not recognized. Registered as a visitor.", "visitor": True})
    
    return jsonify({"message": "Face not recognized. Visitor already logged.", "visitor": True})


if __name__ == "__main__":
    app.run(debug=True)
