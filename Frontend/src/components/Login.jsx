import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  
  const [formData, setFormData] = useState({
    Aname: "",
    password: "",
    userType: "Admin",
    secretKey: "",
  });

  
  const [error, setError] = useState("");

  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault(); 

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.status === "ok") {
        navigate("/DatabasePage"); 
      } else {
        setError(data.message); 
      }
    } catch (err) {
      setError("Login failed. Please try again.");
    }
  };

  return (
    <>
      <div className="app-container"></div>
      <div className="login-box">
        <p>Admin</p>
        {error && <p style={{ color: "red" }}>{error}</p>} 
        <form onSubmit={handleSubmit}>
          <div className="user-box">
            <input
              required
              name="Aname"
              type="text"
              autoComplete="off"
              value={formData.Aname}
              onChange={handleChange}
            />
            <label>Admin Name</label>
          </div>
          <div className="user-box">
            <input
              required
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
            />
            <label>Password</label>
          </div>
          <div className="user-box">
            <input
              required
              name="secretKey"
              autoComplete="off"
              type="text"
              value={formData.secretKey}
              onChange={handleChange}
            />
            <label>Secret Key</label>
          </div>
          <button type="submit" className="login-button">
            Submit
          </button>
        </form>
      </div>
      <button className="button topbtn btwo" onClick={() => navigate("/")}>
        Home
      </button>
    </>
  );
};

export default Login;
