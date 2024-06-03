import React, { useState } from 'react';
import './sidebar.css';

const Sidebar = () => {
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
    <div className={`sidebar-left ${isOpen ? 'open' : 'closed'}`} onClick={openSidebar}>
      <button className="toggle-button" onClick={toggleSidebar}>
        {isOpen ? 'Close' : '>'}
      </button>
      <ul>
        <li className="sidebar-item">
          <div className="icon">🏠</div>
          {isOpen && <span>Task Pool</span>}
        </li>
        <li className="sidebar-item">
          <div className="icon">📊</div>
          {isOpen && <span>Your Boards</span>}
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
