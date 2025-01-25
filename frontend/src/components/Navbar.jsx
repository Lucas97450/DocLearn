import React from "react";
import "./navbar.css";

const Navbar = () => {
  return (
    <div className="navbar-container">
      <div className="navbar-header">
        <div className="logo">Your App</div>
      </div>
      <div className="navbar-links">
        <button className="upload-button">Upload New File</button>
        <ul>
          <li>
            <i className="icon-folder"></i> Computers
          </li>
          <li>
            <i className="icon-share"></i> Shared with me
          </li>
          <li>
            <i className="icon-star"></i> Starred
          </li>
          <li>
            <i className="icon-trash"></i> Trash
          </li>
          <li>
            <i className="icon-backup"></i> Backups
          </li>
        </ul>
      </div>
      <div className="navbar-footer">
        <div className="storage-details">
          <p>Storage: 5.2GB of 10GB used</p>
          <div className="storage-bar">
            <div className="storage-fill"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
