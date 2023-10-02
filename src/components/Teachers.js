import React, { useState } from 'react';
import { DashboardHeader } from './DashbordHeader';

export const Teachers = () => {
  const [teachers, setTeachers] = useState([
    {
      id: 1,
      nom: 'Kalika',
      matiere: 'Programmation / Full-stack',
      email: 'kalika@bk.com',
      telephone: '123-456-7890',
      adresse: 'Dakar',
      archivé: false,
    },
    {
      id: 2,
      nom: 'Mahmoud Barry',
      matiere: 'Programmation / Back-End',
      email: 'mahmoud@bk.com',
      telephone: '987-654-3210',
      adresse: 'Dakar',
      archivé: false,
    },
    {
      id: 3,
      nom: 'Abou Sow',
      matiere: 'Programmation / Mobile',
      email: 'abou@bk.com',
      telephone: '555-555-5555',
      adresse: 'Dakar',
      archivé: false,
    },
    {
      id: 4,
      nom: 'Alkaly Badji',
      matiere: 'Programmation / Front-End',
      email: 'alkaly@bk.com',
      telephone: '777-888-9999',
      adresse: 'Dakar',
      archivé: false,
    },
  ]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Générez un nouvel ID unique pour le professeur ajouté
    const newTeacher = {
      id: teachers.length + 1,
      ...newTeacherData,
      archivé: false,
    };
    // Ajoutez le nouveau professeur à la liste
    setTeachers([...teachers, newTeacher]);
    // Fermez le formulaire d'ajout
    closeAddTeacherForm();
  };

  const handleVoirDetails = (teacherId) => {
    const teacher = teachers.find((t) => t.id === teacherId);
    setSelectedTeacher(teacher);
  };

  const handleArchiverProfesseur = (teacherId) => {
    // Trouvez le professeur à archiver
    const teacherToArchive = teachers.find((t) => t.id === teacherId);

    if (teacherToArchive) {
      // Supprimez le professeur de la liste principale
      const updatedTeachers = teachers.filter((t) => t.id !== teacherId);
      setTeachers(updatedTeachers);

      // Ajoutez le professeur à la liste archivée
      setArchivedTeachers([...archivedTeachers, teacherToArchive]);
    }
  };

  const handleDesarchiverProfesseur = (teacherId) => {
    // Trouvez le professeur à désarchiver
    const teacherToUnarchive = archivedTeachers.find((t) => t.id === teacherId);

    if (teacherToUnarchive) {
      // Supprimez le professeur de la liste archivée
      const updatedArchivedTeachers = archivedTeachers.filter((t) => t.id !== teacherId);
      setArchivedTeachers(updatedArchivedTeachers);

      // Réinsérez le professeur dans la liste principale
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
                    className="btn btn-danger ms-3"
                    onClick={() => handleArchiverProfesseur(teacher.id)}
                  >
                    Archiver le professeur
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
