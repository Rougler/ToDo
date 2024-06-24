import React, { useState } from 'react';
import './sidebar.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faChartBar } from '@fortawesome/free-solid-svg-icons';

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
          <Link to="/" style={{ cursor: 'pointer', textDecoration: 'none' }}>
            <li className="sidebar-item">
              <div className="icon"><FontAwesomeIcon icon={faHome} /></div>
              {isOpen && <span className='icon-tag'>Task Pool</span>}
            </li>
          </Link>
          <Link to="/dashboard" style={{ cursor: 'pointer', textDecoration: 'none' }}>
            <li className="sidebar-item">
              <div className="icon"><FontAwesomeIcon icon={faChartBar} /></div>
              {isOpen && <span className='icon-tag'>Your Boards</span>}
            </li>
          </Link>
        </ul>
      </div>
      <main>{children}</main>
    </>
  );
};

export default Sidebar;
