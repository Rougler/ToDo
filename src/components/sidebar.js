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
        <li className="sidebar-item">
          <div className="icon">🏠</div>
          {isOpen && <span><Link to="/" style={{"cursor":"pointer","text-decoration": "none"}}>Task Pool</Link></span>}
        </li>
        <li className="sidebar-item">
          <div className="icon">📊</div>
          {isOpen && <span><Link to="/dashboard" style={{"cursor":"pointer","text-decoration": "none"}}>Your Boards</Link></span>}
        </li>
      </ul>
    </div>
    <main>{children}</main>
    </>
  );
};

export default Sidebar;
