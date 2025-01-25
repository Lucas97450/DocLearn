import React from "react";
import "./navbar.css";

const Navbar = () => {
  return (
    <div className="navbar-container">
      <div className="logo">LOGO</div>
      <ul className="nav-links">
        <li>Home</li>
        <li>My Documents</li>
        <li>Flashcards</li>
        <li>Quizzes</li>
        <li>Logout</li>
      </ul>
    </div>
  );
};

export default Navbar;
