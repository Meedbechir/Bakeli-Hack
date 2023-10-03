import React from 'react';
import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';

const linkStyle = {
  textDecoration: 'none',
  color: 'inherit',
};

const StudentDashboardHeader = () => {
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      window.location.href = '/login';
    } catch (error) {
      console.error('Erreur lors de la déconnexion :', error);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top" style={{ width: '100%' }}>
      <div className="container">
        <h2>
          <Link to="/" style={linkStyle}>Student Dashboard</Link>
        </h2>

        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <button className="btn btn-danger mt-2 ms-3" onClick={handleSignOut}>Déconnexion</button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default StudentDashboardHeader;
