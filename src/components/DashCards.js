import React from 'react';

export const DashCards = ({ title, count, cardColor }) => {
  return (
    <div className="card mb-5 mx-auto h-100" style={{ width: '22rem' }}>
      <div className="card-body pt-4">
        <h3 className="card-title text-center">{title}</h3>
        <p className="card-text text-center fs-1">{count}</p>
      </div>
    </div>
  );
};
