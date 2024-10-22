// Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap'; // Import Reactstrap components

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simple validation (you can expand this as needed)
    if (!email.includes('@') || password.length < 6) {
      setError('Please enter a valid email and a password with at least 6 characters.');
      return;
    }

    // Assuming successful login
    onLogin(true); // Call the function to update the login state
    navigate('/todopage'); // Redirect to the TodoPage

    //If login not successfull
    // onLogin(false);
    // navigate('/welcome');
  };

  return (
    <div className='lb'>
      <h1 className='lh'>Login</h1>
      {error && <Alert color="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit} className='lform'>
        <FormGroup>
          <Label for="email">Email: </Label>
          <Input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required/>
        </FormGroup>
        <FormGroup >
          <Label for="password">Password: </Label>
          <Input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required />
        </FormGroup>
        <Button type="submit" className='lbtn'>Login</Button>
      </Form>
    </div>
  );
};

export default Login;

