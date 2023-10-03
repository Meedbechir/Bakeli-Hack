import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Dashboard } from './components/Dashoard';
import { Cours } from './components/Cours';
import { Students } from './components/Students';
import { Teachers } from './components/Teachers';
import { Register } from './components/Register';
import { Login } from './components/Login';
import { StudentCours } from './components/StudentCours'; 
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole] = useState('etudiant');

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? (
                userRole === 'etudiant' ? (
                  <Navigate to="/studentCours" />
                ) : (
                  <Navigate to="/dashboard" />
                )
              ) : (
                <Navigate to="/register" />
              )
            }
          />

          <Route path="/register" element={<Register setIsAuthenticated={setIsAuthenticated} />} />

          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />

          <Route
            path="/dashboard"
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
          />

          <Route path="/cours" element={isAuthenticated ? <Cours /> : <Navigate to="/login" />} />

          <Route
            path="/apprenants"
            element={isAuthenticated ? <Students /> : <Navigate to="/login" />}
          />

          <Route
            path="/professeurs"
            element={isAuthenticated ? <Teachers /> : <Navigate to="/login" />}
          />

          <Route
            path="/studentCours"
            element={isAuthenticated && userRole === 'etudiant' ? <StudentCours /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
