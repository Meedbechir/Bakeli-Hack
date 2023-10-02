import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';

const linkStyle = {
  textDecoration: 'none',
  color: 'inherit',
};

export const DashboardHeader = () => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const toggleMobileNav = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      // Rediriger l'utilisateur vers la page de connexion (par exemple '/login')
      window.location.href = '/login';
    } catch (error) {
      console.error('Erreur lors de la déconnexion :', error);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top" style={{ width: '100%' }}>
      <div className="container">
        <h2>
          <Link to="/" style={linkStyle}>Admin Dashboard</Link>
        </h2>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={toggleMobileNav}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${isMobileNavOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link text-primary fs-4" to="/cours">Cours</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-primary fs-4" to="/professeurs">Professeurs</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-primary fs-4" to="/apprenants">Apprenants</Link>
            </li>
            <li className="nav-item">
              <button className="btn btn-danger mt-2 ms-5" onClick={handleSignOut}>Déconnexion</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

