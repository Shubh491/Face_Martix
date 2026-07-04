import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DatabasePage = () => {
    const navigate = useNavigate();
    const [selectedCollection, setSelectedCollection] = useState("Attendance");
    const [data, setData] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [editedData, setEditedData] = useState({});

    // Fetch data when the page loads or when the collection changes
    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/data/${selectedCollection}`);
            setData(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [selectedCollection]);

    // Handle Edit button click
    const handleEdit = (item) => {
        setEditingId(item._id);
        setEditedData({ ...item }); 
    };

    // Handle changes in input fields
    const handleChange = (e) => {
        setEditedData({ ...editedData, [e.target.name]: e.target.value });
    };

    // Save the edited data
    const handleSave = async () => {
        try {
            const updatedData = { ...editedData };
            delete updatedData._id;  // Remove _id before sending request
    
            await axios.put(
                `http://localhost:5000/api/data/${selectedCollection}/${editingId}`,
                updatedData,
                { headers: { "Content-Type": "application/json" } }
            );
    
            setEditingId(null); 
            fetchData();
        } catch (error) {
            console.error("Error updating data:", error);
        }
    };
    
    // Handle Delete button click
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/data/${selectedCollection}/${id}`);
            fetchData();
        } catch (error) {
            console.error("Error deleting data:", error);
        }
    };

    return (
        <div className="app-container">
            <h2 className="title">Data Viewer & Editor</h2>

            <label>Select Collection: </label>
            <select value={selectedCollection} onChange={(e) => setSelectedCollection(e.target.value)}>
                <option value="Attendance">Attendance</option>
                <option value="Faces">Faces</option>
                <option value="Visitors">Visitors</option>
            </select>
            <button className="menuButton" onClick={fetchData}>Fetch Data</button>

            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item._id}>
                            <td>
                                {editingId === item._id ? (
                                    <input 
                                        type="text" 
                                        name="name" 
                                        value={editedData.name || ""} 
                                        onChange={handleChange} 
                                    />
                                ) : (
                                    item.name
                                )}
                            </td>
                            <td>
                                {editingId === item._id ? (
                                    <input 
                                        type="date" 
                                        name="date" 
                                        value={editedData.date || ""} 
                                        onChange={handleChange} 
                                    />
                                ) : (
                                    new Date(item.date).toLocaleDateString()
                                )}
                            </td>
                            <td>
                                {editingId === item._id ? (
                                    <button className="action-btn save-btn" onClick={handleSave}>Save</button>
                                ) : (
                                    <>
                                        <button className="action-btn edit-btn" onClick={() => handleEdit(item)}>Edit</button>
                                        <button className="action-btn delete-btn" onClick={() => handleDelete(item._id)}>Delete</button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <button className="button topbtn btwo" onClick={() => navigate("/")}>Home</button>
        </div>
    );
};

export default DatabasePage;
