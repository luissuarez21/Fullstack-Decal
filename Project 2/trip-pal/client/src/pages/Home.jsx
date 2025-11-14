import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TripForm from '../components/TripForm';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  const handleTripCreated = () => {
    navigate('/trips');
  };

  return (
    <div className="home">
      <h1>Create a Trip</h1>
      <TripForm onTripCreated={handleTripCreated} />
    </div>
  );
};

export default Home;
