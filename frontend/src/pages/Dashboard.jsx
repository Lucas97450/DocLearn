import React from "react";
import Navbar from "../components/Navbar";
import DragAndDrop from "../components/DragAndDrop";
import "./dashboard.css";

const Dashboard = () => {
  return (
    <div className="background">
      <div className="content">
        <Navbar />
        <DragAndDrop />
      </div>
      <div className="section-below">
        <h2>Derniers Uploads</h2>
        <p>Aucun document disponible. Uploadez un document pour commencer.</p>
      </div>
    </div>
  );
};


export default Dashboard;
