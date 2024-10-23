import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, FormGroup, Input, Container, Row, Col } from 'reactstrap';
import { BsGoogle } from 'react-icons/bs';
import { BsInstagram } from 'react-icons/bs';
import { BsPinterest} from 'react-icons/bs';

const Login = ({ setIsLoggedin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!username || !password) {
      setErrorMessage('Please enter both username and password.');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }

    // Set login status and navigate to /todo page
    setIsLoggedin(true);
    navigate('/todopage');
  };

  return (
    <Container fluid className="justify-content-center align-items-center "style={{ minHeight: '100vh', backgroundColor: '#b2b2b2', }}>
      <Row className="justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
        <Col xs="4">
          <h2 className="text-center mb-4" style={{ color: '#323232'}}>Login</h2>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{ backgroundColor: '#6272a4', color: '#f8f8f2', border: '1px solid #f8f8f2'}}
              />
            </FormGroup>
            <FormGroup>
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ backgroundColor: '#6272a4', color: '#f8f8f2', border: '1px solid #f8f8f2' }}
              />
            </FormGroup>
            {errorMessage && <p style={{ color: 'red', textAlign: 'center' }}>{errorMessage}</p>}
            <Button type="submit" className="w-100" style={{ backgroundColor: '#ff79c6', border: 'none' }}>
              Login
            </Button>
            
            <div
              className="text-center mt-3"
              style={{ display: "flex", justifyContent: "space-around" }}>
              <Button>
                <BsGoogle />
              </Button>
              <Button>
                <BsInstagram />
              </Button>
              <Button>
                <BsPinterest />
              </Button>
            </div>
         
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;




