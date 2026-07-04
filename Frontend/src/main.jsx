import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Login from "./components/Login";
import Menu from "./components/Menu"; 
import AboutUs from "./components/AboutUs"
import DatabasePage from "./components/DatabasePage";
import LiveRecognition from "./components/LiveRecognition";
import RegisterFace from "./components/RegisterFace";
import MarkAttendance from "./components/MarkAttendance"; 

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/LiveRecognition" element={<LiveRecognition />} />
                <Route path="/RegisterFace" element={<RegisterFace />} />
                <Route path="/MarkAttendance" element={<MarkAttendance />} />
                <Route path="/AboutUs" element={<AboutUs />} />
                <Route path="/DatabasePage" element={<DatabasePage />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);

