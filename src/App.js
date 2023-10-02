import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react'; // Importez useState depuis React
import { Dashboard } from './components/Dashoard';
import { Cours } from './components/Cours';
import { Students } from './components/Students';
import { Teachers } from './components/Teachers';
import { Register } from './components/Register';
import { Login } from './components/Login';

function App() {
  // État pour vérifier si l'utilisateur est connecté
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/register" />}
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
