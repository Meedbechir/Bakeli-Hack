import React from 'react';
import { DashboardHeader } from './DashbordHeader';
import img from '../assets/images/home2.png';

export const Dashboard = () => {
  return (
    <div>
      <DashboardHeader />
      
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 col-sm-12">
            {/* Ajoutez ici votre image */}
            <img src={img} alt="Img" className="img-fluid" />
          </div>
          <div className="col-md-6 col-sm-12 mt-4">
            <p className='fs-4 mt-4'>Bakeli School of Technology est une école de formation professionnelle dans les nouveaux métiers du digital créée par Volkeno.
            Depuis sa création en 2016, elle a formé plus de 5 000 étudiants et professionnels ! <br /> 
            Des rentrées ont lieu tous les 3 mois pour permettre à un maximum de personnes souhaitant se former en marketing digital, 
            en programmation, en design ou encore en entrepreneuriat, d'intégrer l'école.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
