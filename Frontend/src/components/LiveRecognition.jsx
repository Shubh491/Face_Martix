import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LiveRecognition = () => {
    const navigate = useNavigate();
    const [isRunning, setIsRunning] = useState(false);

    const startRecognition = async () => {
        try {
            const response = await fetch("http://127.0.0.1:5000/live-recognition", { method: "GET" });
            const data = await response.json();
            console.log(data.message);
            setIsRunning(true);
        } catch (error) {
            console.error("Error starting live recognition:", error);
        }
    };

    const stopRecognition = async () => {
        try {
            await fetch("http://127.0.0.1:5000/stop-recognition", { method: "GET" });
            console.log("Live recognition stopped.");
            setIsRunning(false);
        } catch (error) {
            console.error("Error stopping recognition:", error);
        }
    };

    

    return (
        <div className="app-container">
            <h2 className="title">Live Face Recognition</h2>
            {!isRunning ? (
                <button className="menuButton" onClick={startRecognition}>Start Recognition</button>
            ) : (
                <button className="menuButton" onClick={stopRecognition}>Stop Recognition</button>
            )}
            <button className="button topbtn btwo" onClick={() => navigate("/")}>Home</button>
        </div>
    );
};

export default LiveRecognition;
