import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

interface NavbarProps {
  className?: string; // Add className as an optional prop
}

const Navbar: React.FC<NavbarProps> = ({ className }) => {
  return (
    <div className={`navbar ${className}`}>
      <nav>
        <ul>
          <li className="kible">
            <Link to="/kibla"></Link>
          </li>
          <li>
            <Link to="/quran" className="quran"></Link>
          </li>
          <li className="center">
            <Link to="/dhikr" className="center-icon"></Link>
          </li>
          <li>
            <Link to="/names-of-allah" className="allah"></Link>
          </li>
          <li>
            <Link to="/calendar" className="calendar"></Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
