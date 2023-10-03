import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

export const Register = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleFullNameChange = (e) => {
    setFullName(e.target.value);
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleRegistration = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await addDoc(collection(db, 'users'), {
        fullName: fullName,
        phoneNumber: phoneNumber,
        email: email,
        userId: user.uid,
        role: 'admin',
      });

      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setFullName('');
      setPhoneNumber('');

      setIsAuthenticated(true);

      navigate('/login');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="container-fluid div-one">
      <div className="row justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <div className="col-sm-12 col-md-6">
          <div className="border p-4 rounded shadow-lg" style={{ backgroundColor: 'white' }}>
            <h2 className="text-center mb-4">Inscription</h2>
            <form onSubmit={handleRegistration}>
              <div className="mb-3">
                <input
                  type="email"
                  onChange={handleEmailChange}
                  className="form-control"
                  placeholder='Saisissez votre email'
                  required
                  autoComplete='off'
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  onChange={handleFullNameChange}
                  className="form-control"
                  placeholder='Saisissez votre nom complet'
                  required
                  autoComplete='off'
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  onChange={handlePhoneNumberChange}
                  className="form-control"
                  placeholder='Saisissez votre numéro de téléphone'
                  required
                  autoComplete='off'
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  onChange={handlePasswordChange}
                  className="form-control"
                  placeholder='Saisissez votre mot de passe'
                  required
                  autoComplete='off'
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  onChange={handleConfirmPasswordChange}
                  className="form-control"
                  placeholder='Confirmez votre mot de passe'
                  required
                  autoComplete='off'
                />
              </div>
              <div className="text-center mb-4">
                <button className='btn btn-primary'>S'Inscrireeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee</button>
              </div>
              <p className="text-center">Vous avez un compte ? <Link to="/login">Connectez-vous</Link></p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
