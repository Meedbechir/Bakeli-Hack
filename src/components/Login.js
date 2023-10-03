import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { sendPasswordResetEmail } from 'firebase/auth';
import { getDocs, query, where, collection } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

export const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [resetEmail, setResetEmail] = useState('');
  const [showResetModal, setShowResetModal] = useState(false);

  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleResetEmailChange = (e) => {
    setResetEmail(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);

      const usersCollection = collection(db, 'users');
      const q = query(usersCollection, where('email', '==', email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          const userData = doc.data();
          const userRole = userData.role;

          if (userRole === 'admin') {
            setIsAuthenticated(true);
            navigate('/dashboard');
          } else if (userRole === 'etudiant') {
            setIsAuthenticated(true);
            navigate('/studentCours');
          }
        });
      }
    } catch (error) {
      alert('Échec de la connexion. Veuillez vérifier vos informations.');
      console.error(error);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      await sendPasswordResetEmail(auth, resetEmail);
      alert('Un e-mail de réinitialisation de mot de passe a été envoyé à votre adresse e-mail.');
      setResetEmail('');
      setShowResetModal(false);
    } catch (error) {
      alert('Échec de l\'envoi de l\'e-mail de réinitialisation de mot de passe. Veuillez vérifier votre adresse e-mail.');
      console.error(error);
    }
  };

  return (
    <div className="container-fluid div-one">
      <div className="row align-items-center justify-content-center" style={{ minHeight: '80vh' }}>
        <div className="col-12 col-md-8 col-lg-6">
          <div className="border p-4 div-form" style={{ backgroundColor: 'white' }}>
            <h2 className="text-center">Connexion</h2>
            <form onSubmit={handleLogin}>
              <div className="form-group mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  onChange={handleEmailChange}
                  value={email}
                  required
                />
              </div>
              <div className="form-group mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Mot de Passe"
                  onChange={handlePasswordChange}
                  value={password}
                  required
                />
              </div>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <button className="btn btn-primary btn-block">Se Connecter</button>
                <button
                  className="btn btn-danger btn-block mt-2"
                  onClick={() => setShowResetModal(true)}
                >
                  Mot de passe oublié ?
                </button>
              </div>
              <p className="text-center">
                Vous n'avez pas de compte ? <Link to="/register">Inscrivez-vous</Link>
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* Modal pour la réinitialisation du mot de passe */}
      {showResetModal && (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Réinitialiser le Mot de Passe</h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={() => setShowResetModal(false)}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleResetPassword}>
                  <div className="form-group">
                    <label htmlFor="resetEmail">Adresse E-mail</label>
                    <input
                      type="email"
                      className="form-control"
                      id="resetEmail"
                      placeholder="Saisissez votre adresse e-mail"
                      onChange={handleResetEmailChange}
                      value={resetEmail}
                      required
                    />
                  </div>
                  <div className="modal-footer">
                    <button type="submit" className="btn btn-primary">Envoyer</button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setShowResetModal(false)}
                    >
                      Annuler
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
