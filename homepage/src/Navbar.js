// File: src/Navbar.js
import React from 'react';

function Navbar({ onCreateClick, onViewClick }) {
  return (
    <nav className="navbar">
      <h1>Study Buddy</h1>
      <div className="navbar-links">
        <button onClick={onCreateClick}>Create Study Group</button>
        <button onClick={onViewClick}>View Study Groups</button>
      </div>
    </nav>
  );
}

export default Navbar;
