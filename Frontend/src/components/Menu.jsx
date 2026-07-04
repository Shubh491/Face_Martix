import React from "react";
import "./Menu.css";
import { useNavigate } from "react-router-dom";


const Menu = () => {
  const navigate = useNavigate();

  return (
    <div className="app-container">
      <h2 className="title">Menu</h2>
      <button className="menuButton" onClick={() => navigate("/LiveRecognition")}><span className="Live">Live Recognition</span></button>
      <button className="menuButton" onClick={() => navigate("/RegisterFace")}><span className="RegFace">Register Face</span></button>
      <button className="menuButton" onClick={() => navigate("/MarkAttendance")}><span className="Mark">Mark Attendace</span></button>
      <button className="menuButton" onClick={() => navigate("/")}><span className="Home">Home</span></button>
    </div>
  );
};

export default Menu;

