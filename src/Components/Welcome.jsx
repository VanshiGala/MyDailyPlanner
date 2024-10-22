import React from 'react';
import { useNavigate } from 'react-router-dom';
import {Button} from 'reactstrap';

const Welcome = () => {
  const navigate = useNavigate(); // Use the useNavigate hook

  const handleLoginClick = () => {
    navigate('/login'); // Navigate to the login page
  };

  return (
    <div className='wb'>
      <h1 className='wh'>Welcome to your DAILY PLANNER</h1>
      <p className='wp'>Manage your tasks efficiently with ease!</p>
      <Button onClick={handleLoginClick} className='wbtn1'>Login</Button> {/* Button to trigger navigation */}
    </div>
  );
};

export default Welcome;