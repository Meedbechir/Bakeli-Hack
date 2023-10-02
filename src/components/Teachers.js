import React, { useState, useEffect } from 'react';
import { DashboardHeader } from './DashbordHeader';
import { db } from '../config/firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';

export const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [isAddingTeacher, setIsAddingTeacher] = useState(false);
  const [newTeacherData, setNewTeacherData] = useState({
    nom: '',
    matiere: '',
    email: '',
    telephone: '',
    adresse: '',
  });
  const [archivedTeachers, setArchivedTeachers] = useState([]);

  useEffect(() => {
    const loadTeachersFromFirestore = async () => {
      try {
        const teachersCollection = collection(db, 'teachers');
        const querySnapshot = await getDocs(teachersCollection);
        const teacherData = [];

        querySnapshot.forEach((doc) => {
          teacherData.push({ id: doc.id, ...doc.data() });
        });

        setTeachers(teacherData);
      } catch (error) {
        console.error(error);
      }
    };

    loadTeachersFromFirestore();
  }, []);

  const openAddTeacherForm = () => {
    setIsAddingTeacher(true);
  };

  const closeAddTeacherForm = () => {
    setIsAddingTeacher(false);
    setNewTeacherData({
      nom: '',
      matiere: '',
      email: '',
      telephone: '',
      adresse: '',
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTeacherData({
      ...newTeacherData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const docRef = await addDoc(collection(db, 'teachers'), newTeacherData);
      const addedTeacher = {
        id: docRef.id,
        ...newTeacherData,
        archivé: false,
      };

      setTeachers([...teachers, addedTeacher]);

      closeAddTeacherForm();
    } catch (error) {
      console.error(error);
    }
  };

  const handleVoirDetails = (teacherId) => {
    const teacher = teachers.find((t) => t.id === teacherId);
    setSelectedTeacher(teacher);
  };

  const handleArchiverProfesseur = (teacherId) => {
    const teacherToArchive = teachers.find((t) => t.id === teacherId);

    if (teacherToArchive) {
      const updatedTeachers = teachers.filter((t) => t.id !== teacherId);
      setTeachers(updatedTeachers);
      setArchivedTeachers([...archivedTeachers, teacherToArchive]);
    }
  };

  const handleDesarchiverProfesseur = (teacherId) => {
    const teacherToUnarchive = archivedTeachers.find((t) => t.id === teacherId);

    if (teacherToUnarchive) {
      const updatedArchivedTeachers = archivedTeachers.filter((t) => t.id !== teacherId);
      setArchivedTeachers(updatedArchivedTeachers);
      setTeachers([...teachers, teacherToUnarchive]);
    }
  };

  return (
    <div>
      <DashboardHeader />
      <div className="container-fluid mt-4">
        <h2 className="text-center">Liste des Professeurs</h2>
        <div className="row mt-5">
          {teachers.map((teacher) => (
            <div className="col-md-6 mx-auto" key={teacher.id}>
              <div className="card custom-card mb-5 mx-auto p-3">
                <div className="card-body">
                  <h3 className="card-title">{teacher.nom}</h3>
                  <p>Matière enseignée : {teacher.matiere}</p>
                  <button
                    className="btn btn-outline-primary"
                    onClick={() => handleVoirDetails(teacher.id)}
                  >
                    Voir détails
                  </button>
                  <button
                    className="btn btn-info ms-3"
                    onClick={() => handleArchiverProfesseur(teacher.id)}
                  >
                    Archiver
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <h2 className="text-center">Professeurs Archivés</h2>
        <div className="row mt-5">
          {archivedTeachers.map((teacher) => (
            <div className="col-md-6 mx-auto" key={teacher.id}>
              <div className="card custom-card mb-5 mx-auto p-3">
                <div className="card-body">
                  <h3 className="card-title">{teacher.nom}</h3>
                  <p>Matière enseignée : {teacher.matiere}</p>
                  <button
                    className="btn btn-warning"
                    onClick={() => handleDesarchiverProfesseur(teacher.id)}
                  >
                    Désarchiver le professeur
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedTeacher !== null && (
          <div className="modal fade show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Détails du professeur</h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={() => setSelectedTeacher(null)}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <p><strong>Nom:</strong> {selectedTeacher.nom}</p>
                  <p><strong>Matière enseignée:</strong> {selectedTeacher.matiere}</p>
                  <p><strong>Email:</strong> {selectedTeacher.email}</p>
                  <p><strong>Téléphone:</strong> {selectedTeacher.telephone}</p>
                  <p><strong>Adresse:</strong> {selectedTeacher.adresse}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {isAddingTeacher && (
          <div className="modal fade show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Ajouter un professeur</h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={closeAddTeacherForm}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="nom" className="form-label">
                        Nom
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="nom"
                        name="nom"
                        value={newTeacherData.nom}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="matiere" className="form-label">
                        Matière
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="matiere"
                        name="matiere"
                        value={newTeacherData.matiere}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={newTeacherData.email}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="telephone" className="form-label">
                        Téléphone
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="telephone"
                        name="telephone"
                        value={newTeacherData.telephone}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="adresse" className="form-label">
                        Adresse
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="adresse"
                        name="adresse"
                        value={newTeacherData.adresse}
                        onChange={handleInputChange}
                      />
                    </div>
                    <button type="submit" className="btn btn-primary">
                      Ajouter
                    </button>
                  </form>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                    onClick={closeAddTeacherForm}
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
            onClick={openAddTeacherForm}
          >
            Ajouter un professeur
          </button>
        </div>
      </div>
    </div>
  );
};
