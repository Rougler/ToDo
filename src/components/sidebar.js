import React, { useState } from 'react';
import './sidebar.css';
import { Link } from 'react-router-dom';

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const openSidebar = () => {
    if (!isOpen) {
      setIsOpen(true);
    }
  };

  return (
    <>
      <div className={`sidebar-left ${isOpen ? 'open' : 'closed'}`} onClick={openSidebar}>
        <button className="toggle-button" onClick={toggleSidebar}>
          {isOpen ? 'Close' : '>'}
        </button>
        <ul>
          <Link to="/" style={{ "cursor": "pointer", "text-decoration": "none" }}>
            <li className="sidebar-item">
              <div className="icon">🏠</div>
              {isOpen && <span>Task Pool</span>}
            </li>
          </Link>
          <Link to="/dashboard" style={{ "cursor": "pointer", "text-decoration": "none" }}>
            <li className="sidebar-item">
              <div className="icon">📊</div>
              {isOpen && <span>Your Boards</span>}
            </li>
          </Link>
        </ul>
      </div>
      <main>{children}</main>
    </>
  );
};

export default Sidebar;
