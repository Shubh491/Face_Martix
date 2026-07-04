# 🧠 FaceMatrix — AI Powered Smart Attendance System

FaceMatrix is an AI-powered smart attendance system that uses facial recognition to automate attendance marking in real time.

The system identifies registered users through webcam/image input, marks attendance automatically, logs entry and exit times, and tracks unknown visitors.

---

# 📌 Features

* Face registration system
* Real-time face recognition using webcam
* Automatic attendance marking
* Entry & Exit time tracking
* Unknown visitor detection
* Visitor logging system
* Admin dashboard backend
* MongoDB database integration

---

# 🛠 Tech Stack

## AI / Computer Vision

* Python
* OpenCV
* Dlib
* NumPy

## Backend

* Flask
* Node.js
* Express.js

## Database

* MongoDB

## Other Tools

* Tkinter / Webcam Input
* REST APIs

---

# 📂 Project Structure

```bash id="jwr5jq"
FaceMatrix/
│
├── App.py
├── server.js
├── package.json
├── package-lock.json
│
├── shape_predictor_68_face_landmarks.dat
├── dlib_face_recognition_resnet_model_v1.dat
│
├── README.md
└── requirements.txt
```

---

# 🧠 Problem Statement

Traditional attendance systems are:

* Slow
* Manual
* Error-prone
* Vulnerable to proxy attendance

FaceMatrix solves these problems using AI-powered facial recognition.

The system can:

* Identify known users
* Mark attendance automatically
* Detect unknown visitors

---

# 🚀 Core Functionalities

---

# 1. Face Registration

Users can register their face in the system.

Endpoint:

```bash id="6u2v8v"
POST /register_face
```

Input:

* Name
* Image

System:

* Detects face
* Extracts facial embeddings
* Stores encoding in MongoDB

---

# 2. Live Face Recognition

Starts webcam-based live recognition.

Endpoint:

```bash id="g4cn9n"
GET /live-recognition
```

Features:

* Webcam stream capture
* Face detection
* Face matching
* Real-time recognition

---

# 3. Attendance Marking

Attendance is marked automatically after recognition.

Endpoint:

```bash id="3p8zop"
POST /mark_attendance
```

Stores:

* Name
* Date
* Entry Time
* Exit Time

Example:

```json id="kxt90v"
{
  "name": "John",
  "date": "2026-07-05",
  "entry_time": "09:05:10",
  "exit_time": "17:12:30"
}
```

---

# 4. Visitor Detection

Unknown faces are treated as visitors.

System:

* Detects unknown face
* Stores visitor image
* Logs date and time

This improves security and monitoring.

---

# 5. Admin Backend Dashboard

Node.js backend provides admin APIs for dashboard management.

Features:

* Login authentication
* Fetch attendance data
* Update records
* Manage collections

---

# Database Structure

MongoDB Database:

```bash id="4s8cig"
Facial_Recog
```

Collections:

* Faces
* Attendance
* Visitors

---

# AI Pipeline

Step-by-step workflow:

```text id="6g1l3l"
Input Image/Webcam
       ↓
Face Detection
       ↓
Landmark Detection
       ↓
Face Encoding
       ↓
Embedding Comparison
       ↓
Recognition Decision
       ↓
Attendance Marking
```

---

# Face Recognition Model

Uses Dlib pre-trained models:

### Face Landmark Model

```text id="otfhy3"
shape_predictor_68_face_landmarks.dat
```

### Face Recognition Model

```text id="3sqvqp"
dlib_face_recognition_resnet_model_v1.dat
```

---

# Installation

Clone repository:

```bash id="34dzf4"
git clone <repository-url>
cd FaceMatrix
```

---

# Install Python Dependencies

```bash id="gwkn8d"
pip install -r requirements.txt
```

Manual installation:

```bash id="rk27xq"
pip install flask opencv-python dlib numpy pymongo
```

---

# Install Node Dependencies

```bash id="5lgdlo"
npm install
```

---

# Start MongoDB

Ensure MongoDB is running locally:

```bash id="1xy9vf"
mongodb://localhost:27017/
```

---

# Run Python Backend

```bash id="f0ls3k"
python App.py
```

Runs Flask server for:

* Face recognition
* Attendance marking

---

# Run Node Backend

```bash id="3kpw8w"
node server.js
```

Runs Express server on:

```bash id="wdbrxh"
http://localhost:5000
```

---

# API Endpoints

## Python Backend

### Register Face

```bash id="97g40l"
POST /register_face
```

### Start Recognition

```bash id="m0vh9e"
GET /live-recognition
```

### Stop Recognition

```bash id="5r4pn0"
GET /stop-recognition
```

### Mark Attendance

```bash id="w1s3wp"
POST /mark_attendance
```

---

## Node Backend

### Login

```bash id="tq1jtb"
POST /login
```

### Fetch Data

```bash id="8t0r93"
GET /api/data/:collection
```

### Update Data

```bash id="1jlx1w"
PUT /api/data/:collection/:id
```

---

# Applications

* Schools
* Colleges
* Offices
* Hostels
* Corporate Attendance Systems
* Security Systems

---

# Future Improvements

Potential upgrades:

* Cloud deployment
* React frontend dashboard
* Multi-camera support
* Email notifications
* Mobile app integration
* Liveness detection (anti-spoofing)
* Mask detection
* Face recognition with deep learning (FaceNet / ArcFace)

---

# Advantages

* Fast attendance
* Contactless system
* Prevents proxy attendance
* Improves security
* Automated record management

---

# 👨‍💻 Author

Developed as an AI + Computer Vision + Full Stack project focused on:

* Face Recognition
* Attendance Automation
* Real-Time Computer Vision
* Smart Security Systems
