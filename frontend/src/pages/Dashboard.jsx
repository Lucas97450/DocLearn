import React from "react";
import Navbar from "../components/Navbar";
import "./dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Navbar />
      <div className="dashboard-content">
        <h1 className="welcome-text">Welcome back, [Name]!</h1>
        <div className="upload-section">
          <h2>Upload your files</h2>
          <p>Drop your course files here or click to upload</p>
          <div className="upload-box">
            <p>Drag & Drop</p>
          </div>
        </div>
        <div className="recent-documents">
          <h2>Recent Documents</h2>
          <div className="document-card">
            <p>Course Name</p>
            <p>Flashcards completed: 75%</p>
            <div className="actions">
              <button>Delete</button>
              <button>Edit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
