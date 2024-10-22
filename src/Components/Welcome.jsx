import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, CardBody, CardTitle, CardText, Button, ListGroup, ListGroupItem } from 'reactstrap';

const Welcome = () => {
  const navigate = useNavigate(); // Use the useNavigate hook

  const handleLoginClick = () => {
    navigate('/login'); // Navigate to the login page
  };

  return (
    <div>
      <h1>Welcome to your DAILY PLANNER</h1>
      <p>Manage your tasks efficiently with ease!</p>
      <Button onClick={handleLoginClick}>Login</Button> {/* Button to trigger navigation */}
    </div>
  );
};

export default Welcome;