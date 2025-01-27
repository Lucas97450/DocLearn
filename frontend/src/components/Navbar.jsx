import React, { useState } from "react";
import "./navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="logo">MyApp</div>
      <button className="hamburger" onClick={toggleMenu}>
        <span className="line"></span>
        <span className="line"></span>
        <span className="line"></span>
      </button>
      <ul className={`nav-links ${isOpen ? "open" : ""}`}>
        <li>Flashcards</li>
        <li>Quizzes</li>
        <li>Profile</li>
      </ul>
    </nav>
  );
};

export default Navbar;
