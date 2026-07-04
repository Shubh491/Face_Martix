import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const MarkAttendance = () => {
    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const [image, setImage] = useState(null);

    const handleCapture = async () => {
        try {
            const video = document.createElement("video");
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            video.srcObject = stream;

            await new Promise((resolve) => (video.onloadedmetadata = resolve));
            video.play();

            const canvas = document.createElement("canvas");
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            stream.getTracks().forEach(track => track.stop()); 

            canvas.toBlob((blob) => {
                setImage(blob);
            }, "image/jpeg");

        } catch (error) {
            console.error("Error capturing image:", error);
        }
    };

    const handleMarkAttendance = async () => {
        if (!image) {
            alert("Please capture an image first.");
            return;
        }

        const formData = new FormData();
        formData.append("image", image);

        try {
            const response = await fetch("http://127.0.0.1:5000/mark_attendance", {
                method: "POST",
                body: formData
            });

            const data = await response.json();
            setMessage(data.message);
        } catch (error) {
            console.error("Error marking attendance:", error);
        }
    };

    return (
        <div className="app-container">
            <h2 className="title">Mark Attendance</h2>
            <button className="menuButton" onClick={handleCapture}><span className="RegFace">Capture Image</span></button>
            {image && <p>Image captured! Ready to mark attendance.</p>}
            <button className="menubutton" onClick={handleMarkAttendance}>Mark Attendance</button>
            <button className="button topbtn btwo" onClick={() => navigate("/")}>Home</button>
            <p>{message}</p>
        </div>
    );
};

export default MarkAttendance;
