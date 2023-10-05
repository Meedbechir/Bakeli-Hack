import React, { useEffect, useState } from 'react';
import { DashboardHeader } from './DashbordHeader';
import { DashCards } from './DashCards'; 
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { FaMapMarker, FaClock, FaCalendar } from 'react-icons/fa'; // Importation des icônes de React Icons

export const Dashboard = () => {
  const [numberOfTeachers, setNumberOfTeachers] = useState(0);
  const [numberOfCourses, setNumberOfCourses] = useState(0);
  const [numberOfStudents, setNumberOfStudents] = useState(0);

  useEffect(() => {
   
    const getNumberOfTeachers = async () => {
      const db = getFirestore();
      const teachersCollection = collection(db, 'teachers'); 

      const querySnapshot = await getDocs(teachersCollection);
      const numberOfTeachers = querySnapshot.size;
      setNumberOfTeachers(numberOfTeachers);
    };

    const getNumberOfCourses = async () => {
      const db = getFirestore();
      const coursesCollection = collection(db, 'cours'); 

      const querySnapshot = await getDocs(coursesCollection);
      const numberOfCourses = querySnapshot.size;
      setNumberOfCourses(numberOfCourses);
    };

    const getNumberOfStudents = async () => {
      const db = getFirestore();
      const usersCollection = collection(db, 'users'); 

      const querySnapshot = await getDocs(usersCollection);
      let numberOfStudents = 0;

      querySnapshot.forEach((doc) => {
        const userData = doc.data();
        if (userData.role === 'etudiant') {
          numberOfStudents++;
        }
      });

      setNumberOfStudents(numberOfStudents);
    };

    getNumberOfTeachers();
    getNumberOfCourses();
    getNumberOfStudents();
  }, []);

  // Données des événements à venir
  const upcomingEvents = [
    {
      title: 'Événement 1',
      location: 'Salle A',
      time: '10h00 - 12h00',
      date: '2023-10-15',
    },
    {
      title: 'Événement 2',
      location: 'Salle B',
      time: '14h00 - 16h00',
      date: '2023-10-20',
    },
    {
      title: 'Événement 3',
      location: 'Salle C',
      time: '09h30 - 11h30',
      date: '2023-10-25',
    },
  ];

  return (
    <div>
      <DashboardHeader />
      <div className="container-fluid mt-5 pt-5">
        <div className="row my-3">
          <div className="col-md-4 mb-3">
            <DashCards title="Nombre de professeurs" count={numberOfTeachers}/>
          </div>
          <div className="col-md-4 mb-3">
            <DashCards title="Nombre de cours" count={numberOfCourses} cardColor="course-card" />
          </div>
          <div className="col-md-4 mb-3">
            <DashCards title="Nombre d'étudiants" count={numberOfStudents} cardColor="student-card" />
          </div>
        </div>
        <div className="row mt-5 pt-3">
          <h1>Les Événements à Venir</h1>
          <ul className="event-list">
            {upcomingEvents.map((event, index) => (
              <li key={index} className="event-item">
                <strong>{event.title}</strong><br />
                <span className="event-info"><FaMapMarker size={32} /> Lieu : {event.location}</span><br />
                <span className="event-info"><FaClock size={32} /> Heure : {event.time}</span><br />
                <span className="event-info"><FaCalendar size={32} /> Date : {event.date}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};