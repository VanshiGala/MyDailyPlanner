import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Welcome from './Components/Welcome';
import Login from './Components/Login';
import TodoPage from './Components/TodoPage';
import Bin from './Components/Bin';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  

  // Check for logged-in status in localStorage
  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
      setIsAuthenticated(true);
    }
  }, []);

  // Handle login logic
  const handleLogin = (usernameInput) => {
    setUsername(usernameInput);
    setIsAuthenticated(true);
    localStorage.setItem('username', usernameInput); // Store the username in localStorage
  };

  // Handle logout logic
  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsername('');
    localStorage.removeItem('username'); // Clear the username from localStorage
  };

  return (
    <Router>
      <Routes>
        {/* Welcome Page Route */}
        <Route path="/welcome" element={<Welcome />} />

       {/* Login Route */}
        <Route
          path="/login"
          element={!isAuthenticated ? <Login setIsLoggedin ={handleLogin} /> : <Navigate to="/todopage" />}
        />
        {/* TodoPage Route */}
        <Route
          path="/todopage"
          element={isAuthenticated ? <TodoPage username={username} onLogout={handleLogout} /> : <Navigate to="/login" />}
        />

        {/* Bin Page Route */}
        <Route
          path="/bin"
          element={isAuthenticated ? <Bin /> : <Navigate to="/todopage" />}
        />

        {/* Redirect to Welcome Page or Todo Page based on authentication */}
        <Route
          path="/"
          element={isAuthenticated ? <Navigate to="/todopage" /> : <Navigate to="/welcome" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
