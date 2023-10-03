import React, { useState, useEffect } from 'react';
import { DashboardHeader } from './DashbordHeader';
import { db } from '../config/firebase';
import { collection, addDoc, getDocs, doc, updateDoc } from 'firebase/firestore';

export const Cours = () => {
  const [coursData, setCoursData] = useState([]);
  const [selectedCours, setSelectedCours] = useState(null);
  const [isAddingCours, setIsAddingCours] = useState(false);
  const [isEditingCours, setIsEditingCours] = useState(false);
  const [newCoursData, setNewCoursData] = useState({
    nom: '',
    professeur: '',
    duree: '',
    niveau: '',
  });
  const [editedCoursData, setEditedCoursData] = useState({
    id: '',
    nom: '',
    professeur: '',
    duree: '',
    niveau: '',
  });
  const [archivedCours, setArchivedCours] = useState([]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const docRef = await addDoc(collection(db, 'cours'), newCoursData);
      const addedCours = {
        id: docRef.id,
        ...newCoursData,
        archivé: false,
      };

      setCoursData([...coursData, addedCours]);

      closeAddCoursForm();
    } catch (error) {
      console.error(error);
    }
  };

  const handleVoirDetails = (coursId) => {
    const cours = coursData.find((c) => c.id === coursId);
    setSelectedCours(cours);
  };

  const handleArchiverCours = async (coursId) => {
    const coursToArchive = coursData.find((c) => c.id === coursId);

    if (coursToArchive) {
      try {
        const coursDocRef = doc(db, 'cours', coursId);
        await updateDoc(coursDocRef, { archivé: true });

        const updatedCours = coursData.filter((c) => c.id !== coursId);
        setCoursData(updatedCours);

        setArchivedCours([...archivedCours, coursToArchive]);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleDesarchiverCours = async (coursId) => {
    const coursToUnarchive = archivedCours.find((c) => c.id === coursId);

    if (coursToUnarchive) {
      try {
        const coursDocRef = doc(db, 'cours', coursId);
        await updateDoc(coursDocRef, { archivé: false });

        const updatedArchivedCours = archivedCours.filter((c) => c.id !== coursId);
        setArchivedCours(updatedArchivedCours);

        setCoursData([...coursData, coursToUnarchive]);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleEditCours = (cours) => {
    setEditedCoursData(cours);
    setIsEditingCours(true);
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditedCoursData({
      ...editedCoursData,
      [name]: value,
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    try {
      const coursDocRef = doc(db, 'cours', editedCoursData.id);
      await updateDoc(coursDocRef, {
        nom: editedCoursData.nom,
        professeur: editedCoursData.professeur,
        duree: editedCoursData.duree,
        niveau: editedCoursData.niveau,
      });

      const updatedCoursData = coursData.map((c) =>
        c.id === editedCoursData.id ? editedCoursData : c
      );

      setCoursData(updatedCoursData);
      setIsEditingCours(false);
    } catch (error) {
      console.error(error);
    }
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
                  <button
                    className="btn btn-info ms-3 btnarc"
                    onClick={() => handleArchiverCours(cours.id)}
                  >
                    Archiver
                  </button>
                  <button
                    className="btn btn-success ms-3"
                    onClick={() => handleEditCours(cours)}
                  >
                    Modifier
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
          <div
            className="modal custom-modal fade show"
            tabIndex="-1"
            role="dialog"
            style={{ display: 'block' }}
          >
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
                  <p>
                    <strong>Nom du cours :</strong> {selectedCours.nom}
                  </p>
                  <p>
                    <strong>Professeur :</strong> {selectedCours.professeur}
                  </p>
                  <p>
                    <strong>Durée :</strong> {selectedCours.duree}
                  </p>
                  <p>
                    <strong>Niveau :</strong> {selectedCours.niveau}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {isAddingCours && (
          <div
            className="modal custom-modal fade show"
            tabIndex="-1"
            role="dialog"
            style={{ display: 'block' }}
          >
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

        {isEditingCours && (
          <div
            className="modal custom-modal fade show"
            tabIndex="-1"
            role="dialog"
            style={{ display: 'block' }}
          >
            <div className="modal-dialog custom-modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header custom-modal-header">
                  <h5 className="modal-title custom-modal-title">Modifier le cours</h5>
                  <button
                    type="button"
                    className="close custom-modal-close"
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={() => setIsEditingCours(false)}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body custom-modal-body">
                  <form onSubmit={handleEditSubmit}>
                    <div className="mb-3">
                      <label htmlFor="nom" className="form-label">
                        Nom du cours
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="nom"
                        name="nom"
                        value={editedCoursData.nom}
                        onChange={handleEditInputChange}
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
                        value={editedCoursData.professeur}
                        onChange={handleEditInputChange}
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
                        value={editedCoursData.duree}
                        onChange={handleEditInputChange}
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
                        value={editedCoursData.niveau}
                        onChange={handleEditInputChange}
                      />
                    </div>
                    <button type="submit" className="btn btn-primary">
                      Enregistrer
                    </button>
                  </form>
                </div>
                <div className="modal-footer custom-modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                    onClick={() => setIsEditingCours(false)}
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
