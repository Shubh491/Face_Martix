import React from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

const App = () => {
    const navigate = useNavigate();

    return (
        <>
        <div className="app-container">
            <h1 className="app-title">FaceMatriX</h1>
            <button className="button" onClick={() => navigate("./menu")}>
                Go to Menu
            </button>
            <button className="button topbtn btwo" onClick={() => navigate("./Login")}>
                Login
            </button>
            <button className="button topbtn bone" onClick={() => navigate("./AboutUs")}>
                About Us
            </button>
        </div>
        </>
    );
};

export default App;
