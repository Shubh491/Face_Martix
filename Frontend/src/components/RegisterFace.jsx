import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const RegisterFace = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
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

    const handleRegister = async () => {
        if (!name || !image) {
            alert("Please enter a name and capture an image first.");
            return;
        }

        const formData = new FormData();
        formData.append("name", name);
        formData.append("image", image);

        try {
            const response = await fetch("http://127.0.0.1:5000/register_face", {
                method: "POST",
                body: formData
            });

            const data = await response.json();
            alert(data.message);
        } catch (error) {
            console.error("Error registering face:", error);
        }
    };

    return (
        <div className="app-container">
            <h2 className="title">Register Face</h2>
            <div className="InputContainer">
            <input
                className="input"
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            /></div>
            <button className="menuButton" onClick={handleCapture}>Capture Image</button>
            {image && <p>Image captured! Ready to register.</p>}
            <button className="menuButton" onClick={handleRegister}><span className="Mark">Register Face</span></button>
            <button className="button topbtn btwo" onClick={() => navigate("/")}>Home</button>
        </div>
    );
};

export default RegisterFace;
