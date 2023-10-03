import React, { useState, useEffect } from 'react';
import StudentDashboard from './StudentDashboardHeader';
import { db } from '../config/firebase';
import { collection, getDocs } from 'firebase/firestore';

export const StudentCours = () => {
  const [coursData, setCoursData] = useState([]);
  const [selectedCours, setSelectedCours] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const loadCoursFromFirestore = async () => {
      try {
        const coursCollection = collection(db, 'cours');
        const querySnapshot = await getDocs(coursCollection);
        const coursData = [];

        querySnapshot.forEach((doc) => {
          coursData.push({ id: doc.id, ...doc.data() });
        });

        setCoursData(coursData);
      } catch (error) {
        console.error(error);
      }
    };

    loadCoursFromFirestore();
  }, []);

  const handleVoirDetails = (coursId) => {
    const cours = coursData.find((c) => c.id === coursId);
    setSelectedCours(cours);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <StudentDashboard />
      <div className="container-fluid mt-4">
        <h2 className="text-center">Liste des Cours</h2>
        <div className="row mt-5">
          {coursData.map((cours) => (
            <div className="col-md-6 mx-auto" key={cours.id}>
              <div className="card custom-card mb-5 mx-auto p-3">
                <div className="card-body">
                  <h3 className="card-title">{cours.nom}</h3>
                  <button
                    className="btn btn-outline-primary"
                    onClick={() => handleVoirDetails(cours.id)}
                  >
                    Voir détails
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedCours && (
        <div className={`modal fade ${showModal ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: showModal ? 'block' : 'none' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Détails du Cours</h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={handleCloseModal}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <h3>{selectedCours.nom}</h3>
                <p><strong>Professeur :</strong> {selectedCours.professeur}</p>
                <p><strong>Durée :</strong> {selectedCours.duree}</p>
                <p><strong>Niveau :</strong> {selectedCours.niveau}</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                  onClick={handleCloseModal}
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
