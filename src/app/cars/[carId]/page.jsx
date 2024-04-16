import React from 'react';

const Car = ({ params }) => {
  return (
    <div>
      <h1>Car Id</h1>
      <div>{params.carId}</div>
    </div>
  );
};

export default Car;
