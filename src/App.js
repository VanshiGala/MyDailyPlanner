import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Welcome from './Components/Welcome';
import Login from './Components/Login';
import TodoPage from './Components/TodoPage';
import Bin from './Components/Bin';
import Header from './Components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
// App > Login
// TODO
// Header -> logout

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);  

  // Check for logged-in status in localStorage
  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setIsAuthenticated(true);
    }
  }, []);

  // Handle login logic
  const handleLogin = (usernameInput) => {
    setIsAuthenticated(true);
    localStorage.setItem('username', usernameInput); // Store the username in localStorage
  };

  // Handle logout logic
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('username'); // Clear the username from localStorage
  };

  return (
    <>      
    <Router>
      <Header handleLogout={handleLogout}/>
      <Routes>
        {/* Welcome Page Route */}
        <Route path="/welcome" element={<Welcome />} />

       {/* Login Route */}
        <Route
          path="/login"
          element={!isAuthenticated ? <Login handleLogin = {handleLogin} /> : <Navigate to="/todopage" />}
        />
        {/* TodoPage Route */}
        <Route
          path="/todopage"
          element={isAuthenticated ? <TodoPage/> : <Navigate to="/login" />}
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
    </>
  );
}

export default App;
