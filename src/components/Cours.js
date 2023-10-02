import React, { useState } from 'react';
import { DashboardHeader } from './DashbordHeader'; // Assurez-vous d'ajuster le chemin d'importation selon votre structure de projet

export const Cours = () => {
  const [coursData, setCoursData] = useState([
    {
      id: 1,
      nom: 'Introduction à la programmation',
      professeur: 'Kalika',
      duree: '10 semaines',
      niveau: 'Débutant',
      archivé: false,
    },
    {
      id: 2,
      nom: 'Bases de données avancées',
      professeur: 'Mahmoud Barry',
      duree: '12 semaines',
      niveau: 'Intermédiaire',
      archivé: false,
    },
    {
      id: 3,
      nom: 'Développement mobile',
      professeur: 'Abou Sow',
      duree: '8 semaines',
      niveau: 'Avancé',
      archivé: false,
    },
    {
      id: 4,
      nom: 'Conception web moderne',
      professeur: 'Alkaly Badji',
      duree: '14 semaines',
      niveau: 'Intermédiaire',
      archivé: false,
    },
  ]);

  const [selectedCours, setSelectedCours] = useState(null);
  const [isAddingCours, setIsAddingCours] = useState(false);

  const [newCoursData, setNewCoursData] = useState({
    nom: '',
    professeur: '',
    duree: '',
    niveau: '',
  });

  const [archivedCours, setArchivedCours] = useState([]);

  const openAddCoursForm = () => {
    setIsAddingCours(true);
  };

  const closeAddCoursForm = () => {
    setIsAddingCours(false);
    setNewCoursData({
      nom: '',
      professeur: '',
      duree: '',
      niveau: '',
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCoursData({
      ...newCoursData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Générez un nouvel ID unique pour le cours ajouté
    const newCours = {
      id: coursData.length + 1,
      ...newCoursData,
      archivé: false,
    };
    // Ajoutez le nouveau cours à la liste
    setCoursData([...coursData, newCours]);
    // Fermez le formulaire d'ajout
    closeAddCoursForm();
  };

  const handleVoirDetails = (coursId) => {
    const cours = coursData.find((c) => c.id === coursId);
    setSelectedCours(cours);
  };

  const handleArchiverCours = (coursId) => {
    // Trouvez le cours à archiver
    const coursToArchive = coursData.find((c) => c.id === coursId);

    if (coursToArchive) {
      // Supprimez le cours de la liste principale
      const updatedCours = coursData.filter((c) => c.id !== coursId);
      setCoursData(updatedCours);

      // Ajoutez le cours à la liste archivée
      setArchivedCours([...archivedCours, coursToArchive]);
    }
  };

  const handleDesarchiverCours = (coursId) => {
    // Trouvez le cours à désarchiver
    const coursToUnarchive = archivedCours.find((c) => c.id === coursId);

    if (coursToUnarchive) {
      // Supprimez le cours de la liste archivée
      const updatedArchivedCours = archivedCours.filter((c) => c.id !== coursId);
      setArchivedCours(updatedArchivedCours);

      // Réinsérez le cours dans la liste principale
      setCoursData([...coursData, coursToUnarchive]);
    }
  };

  return (
    <div>
      <DashboardHeader /> {/* Inclusion du composant DashboardHeader */}
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
                  <button
                    className="btn btn-danger ms-3 btnarc"
                    onClick={() => handleArchiverCours(cours.id)}
                  >
                    Archiver le cours
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <h2 className="text-center">Cours Archivés</h2>
        <div className="row mt-5">
          {archivedCours.map((cours) => (
            <div className="col-md-6 mx-auto" key={cours.id}>
              <div className="card custom-card mb-5 mx-auto p-3">
                <div className="card-body">
                  <h3 className="card-title">{cours.nom}</h3>
                  <button
                    className="btn btn-warning"
                    onClick={() => handleDesarchiverCours(cours.id)}
                  >
                    Désarchiver le cours
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedCours && (
          <div className="modal custom-modal fade show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
            <div className="modal-dialog custom-modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header custom-modal-header">
                  <h5 className="modal-title custom-modal-title">Détails du cours</h5>
                  <button
                    type="button"
                    className="close custom-modal-close"
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={() => setSelectedCours(null)}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body custom-modal-body">
                  <p><strong>Nom du cours :</strong> {selectedCours.nom}</p>
                  <p><strong>Professeur :</strong> {selectedCours.professeur}</p>
                  <p><strong>Durée :</strong> {selectedCours.duree}</p>
                  <p><strong>Niveau :</strong> {selectedCours.niveau}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {isAddingCours && (
          <div className="modal custom-modal fade show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
            <div className="modal-dialog custom-modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header custom-modal-header">
                  <h5 className="modal-title custom-modal-title">Ajouter un cours</h5>
                  <button
                    type="button"
                    className="close custom-modal-close"
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={closeAddCoursForm}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body custom-modal-body">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="nom" className="form-label">
                        Nom du cours
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="nom"
                        name="nom"
                        value={newCoursData.nom}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="professeur" className="form-label">
                        Professeur
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="professeur"
                        name="professeur"
                        value={newCoursData.professeur}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="duree" className="form-label">
                        Durée
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="duree"
                        name="duree"
                        value={newCoursData.duree}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="niveau" className="form-label">
                        Niveau
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="niveau"
                        name="niveau"
                        value={newCoursData.niveau}
                        onChange={handleInputChange}
                      />
                    </div>
                    <button type="submit" className="btn btn-primary">
                      Ajouter
                    </button>
                  </form>
                </div>
                <div className="modal-footer custom-modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                    onClick={closeAddCoursForm}
                  >
                    Annuler
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="text-center mb-5">
          <button
            className="btn btn-success btn-lg btn-responsive"
            onClick={openAddCoursForm}
          >
            Ajouter un cours
          </button>
        </div>
      </div>
    </div>
  );
};
