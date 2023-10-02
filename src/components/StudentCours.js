import React, { useState } from 'react';
import { DashboardHeader } from './DashbordHeader';

export const StudentCours = () => {
  const [coursData] = useState([
    {
      id: 1,
      nom: 'Introduction à la programmation',
      professeur: 'Kalika',
      duree: '10 semaines',
      niveau: 'Débutant',
    },
    {
      id: 2,
      nom: 'Bases de données avancées',
      professeur: 'Mahmoud Barry',
      duree: '12 semaines',
      niveau: 'Intermédiaire',
    },
  ]);

  const [selectedCours, setSelectedCours] = useState(null);

  const handleVoirDetails = (coursId) => {
    const cours = coursData.find((c) => c.id === coursId);
    setSelectedCours(cours);
  };

  return (
    <div>
      <DashboardHeader />
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

        {selectedCours && (
          <div className="container mt-5">
            <h2 className="text-center">Détails du Cours</h2>
            <div className="card custom-card mx-auto p-3">
              <div className="card-body">
                <h3 className="card-title">{selectedCours.nom}</h3>
                <p><strong>Professeur :</strong> {selectedCours.professeur}</p>
                <p><strong>Durée :</strong> {selectedCours.duree}</p>
                <p><strong>Niveau :</strong> {selectedCours.niveau}</p>
              </div>
            </div>

            <h2 className="text-center mt-5">Calendrier du Cours</h2>
            
          </div>
        )}
      </div>
    </div>
  );
};
