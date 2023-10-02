import React, { useState, useEffect } from 'react';
import { DashboardHeader } from './DashbordHeader';
import { db } from '../config/firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';

export const Students = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isAddingStudent, setIsAddingStudent] = useState(false);
  const [newStudentData, setNewStudentData] = useState({
    prenom: '',
    nom: '',
    matiere: '',
    email: '',
    telephone: '',
    adresse: '',
    mdp: '',
  });
  const [archivedStudents, setArchivedStudents] = useState([]);

  useEffect(() => {
    const loadStudentsFromFirestore = async () => {
      try {
        const studentsCollection = collection(db, 'students');
        const querySnapshot = await getDocs(studentsCollection);
        const studentData = [];

        querySnapshot.forEach((doc) => {
          studentData.push({ id: doc.id, ...doc.data() });
        });

        setStudents(studentData);
      } catch (error) {
        console.error( error);
      }
    };

    loadStudentsFromFirestore();
  }, []);

  const openAddStudentForm = () => {
    setIsAddingStudent(true);
  };

  const closeAddStudentForm = () => {
    setIsAddingStudent(false);
    setNewStudentData({
      prenom: '',
      nom: '',
      matiere: '',
      email: '',
      telephone: '',
      mdp: '',
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudentData({
      ...newStudentData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const docRef = await addDoc(collection(db, 'students'), newStudentData);
      const addedStudent = {
        id: docRef.id,
        ...newStudentData,
        archivé: false,
      };

      setStudents([...students, addedStudent]);

      closeAddStudentForm();
    } catch (error) {
      console.error(error);
    }
  };

  const handleVoirDetails = (studentId) => {
    const student = students.find((s) => s.id === studentId);
    setSelectedStudent(student);
  };

  const handleArchiverEtudiant = (studentId) => {
    const studentToArchive = students.find((s) => s.id === studentId);

    if (studentToArchive) {
      const updatedStudents = students.filter((s) => s.id !== studentId);
      setStudents(updatedStudents);
      setArchivedStudents([...archivedStudents, studentToArchive]);
    }
  };

  const handleDesarchiverEtudiant = (studentId) => {
    const studentToUnarchive = archivedStudents.find((s) => s.id === studentId);

    if (studentToUnarchive) {
      const updatedArchivedStudents = archivedStudents.filter((s) => s.id !== studentId);
      setArchivedStudents(updatedArchivedStudents);
      setStudents([...students, studentToUnarchive]);
    }
  };

  return (
    <div>
      <DashboardHeader />
      <div className="container-fluid mt-4">
        <h2 className="text-center">Liste des Étudiants</h2>
        <div className="row mt-5">
          {students.map((student) => (
            <div className="col-md-6 mx-auto" key={student.id}>
              <div className="card custom-card mb-5 mx-auto p-3">
                <div className="card-body">
                  <h3 className="card-title">{student.prenom} {student.nom}</h3>
                  <p>Matière étudiée : {student.matiere}</p>
                  <button
                    className="btn btn-outline-primary"
                    onClick={() => handleVoirDetails(student.id)}
                  >
                    Voir détails
                  </button>
                  <button
                    className="btn btn-info ms-3"
                    onClick={() => handleArchiverEtudiant(student.id)}
                  >
                    Archiver
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <h2 className="text-center">Liste des Étudiants Archivés</h2>
        <div className="row mt-5">
          {archivedStudents.map((student) => (
            <div className="col-md-6 mx-auto" key={student.id}>
              <div className="card custom-card mb-5 mx-auto p-3">
                <div className="card-body">
                  <h3 className="card-title">{student.prenom} {student.nom}</h3>
                  <p>Matière étudiée : {student.matiere}</p>
                  <button
                    className="btn btn-warning"
                    onClick={() => handleDesarchiverEtudiant(student.id)}
                  >
                    Désarchiver l'étudiant
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedStudent !== null && (
          <div className="modal fade show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Détails de l'étudiant</h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={() => setSelectedStudent(null)}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <p><strong>Prénom:</strong> {selectedStudent.prenom}</p>
                  <p><strong>Nom:</strong> {selectedStudent.nom}</p>
                  <p><strong>Email:</strong> {selectedStudent.email}</p>
                  <p><strong>Téléphone:</strong> {selectedStudent.telephone}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {isAddingStudent && (
          <div className="modal fade show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Ajouter un étudiant</h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={closeAddStudentForm}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="prenom" className="form-label">
                        Prénom
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="prenom"
                        name="prenom"
                        value={newStudentData.prenom}
                        onChange={handleInputChange}
                      autoComplete='off'/>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="nom" className="form-label">
                        Nom
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="nom"
                        name="nom"
                        value={newStudentData.nom}
                        onChange={handleInputChange}
                        autoComplete='off' />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="nom" className="form-label">
                        Matière
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="matiere"
                        name="matiere"
                        value={newStudentData.matiere}
                        onChange={handleInputChange}
                        autoComplete='off'/>
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
                        value={newStudentData.email}
                        onChange={handleInputChange}
                        autoComplete='off'/>
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
                        value={newStudentData.telephone}
                        onChange={handleInputChange}
                        autoComplete='off'/>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="mdp" className="form-label">
                        Mot de passe
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="mdp"
                        name="mdp"
                        value={newStudentData.mdp}
                        onChange={handleInputChange}
                        autoComplete='off' />
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
                    onClick={closeAddStudentForm}
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
            onClick={openAddStudentForm}
          >
            Ajouter un étudiant
          </button>
        </div>
      </div>
    </div>
  );
};
