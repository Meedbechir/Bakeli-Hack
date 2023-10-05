import React, { useEffect, useState } from 'react';
import { DashboardHeader } from './DashbordHeader';
import { DashCards } from './DashCards'; 
import { getFirestore, collection, getDocs } from 'firebase/firestore';

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

  return (
    <div>
      <DashboardHeader />
    <div className="container-fluid mt-5 pt-5">
      <div className="row my-3">
        <div className="col-md-4 mb-3">
          <DashCards title="Nombre de professeurs" count={numberOfTeachers} />
        </div>
        <div className="col-md-4 mb-3">
          <DashCards title="Nombre de cours" count={numberOfCourses} />
        </div>
        <div className="col-md-4 mb-3">
          <DashCards title="Nombre d'étudiants" count={numberOfStudents} />
        </div>
      </div>

    </div>
    </div>
  );
};
