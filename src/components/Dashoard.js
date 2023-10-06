import React, { useEffect, useState } from 'react';
import { DashboardHeader } from './DashbordHeader';
import { DashCards } from './DashCards'; 
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { FaMapMarker, FaClock, FaCalendar } from 'react-icons/fa';

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

  const upcomingEvents = [
    {
      title: 'Immersion avec Bakeli Mbour/Thies',
      location: 'Ngaparou Saly',
      time: '10h00 - 12h00',
      date: '2023-10-15',
    },
    {
      title: 'Match de foot Bakeli vs Volkeno',
      location: 'Dakar sacre coeur',
      time: '14h00 - 16h00',
      date: '2023-10-20',
    },
    {
      title: 'Kokutana Edion 2023',
      location: 'Place du Souvenir',
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
            <DashCards title="Nombre de cours" count={numberOfCourses}/>
          </div>
          <div className="col-md-4 mb-3">
            <DashCards title="Nombre d'étudiants" count={numberOfStudents} />
          </div>
        </div>
        <div className="row mt-5 pt-3">
          <h1>Les Événements à Venir</h1>
          <ul className="event-list">
            {upcomingEvents.map((event, index) => (
              <li key={index} className="event-item">
                <strong className='fs-4'>{event.title}</strong><br />
                <span className="event-info fs-5"><FaMapMarker size={30} style={{ color: 'blue' }} /> Lieu : {event.location}</span><br />
                <span className="event-info  fs-5"><FaClock size={30} style={{ color: 'blue' }} /> Heure : {event.time}</span><br />
                <span className="event-info  fs-5"><FaCalendar size={30}  style={{ color: 'blue' }}/> Date : {event.date}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};