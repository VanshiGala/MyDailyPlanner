import React from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';



const Welcome = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  const goToLogin = () => {
    navigate('/login'); // Navigate to login page
  };

  return (
    <Container fluid className= "justify-content-center align-items-center"style={{ backgroundColor: '#cccccc', minHeight:'100vh'}}>
      <Row>
        <Col xs="12">
          <h1 className="text-center p-5">Plan. Prioritize. Prosper!</h1>
        </Col>
      </Row>
      <Row className= "justify-content-center align-items-center mb-4">
        <Col className="text-center mb-3">  
              <h5 className='text-center'>Your Tasks, Simplified: Start Organizing Today!</h5>
              <Button color="primary" onClick={goToLogin} className='mt-3' >
                Login
              </Button>
              
            
        </Col>
      </Row>
    </Container>
  );
};

export default Welcome;
