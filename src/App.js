import React, { useState } from 'react';
import { BrowserRouter as Router, Route,Routes, Navigate } from 'react-router-dom';
import Welcome from './Components/Welcome';
import Login from './Components/Login';
import TodoPage from './Components/TodoPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (status) => {
    setIsLoggedIn(status);
  };

  return (
    <Router>
      <Routes>
        <Route path="/welcome" element={<Welcome />} /> {/* Use element instead of component */}
        <Route path="/login" element={<Login onLogin={handleLogin} />} /> {/* Use element instead of render */}
        <Route path="/todopage" element={isLoggedIn ? <TodoPage /> : <Navigate to="/welcome" />} // Use element prop for conditional rendering
        />
        <Route path="*" element={<Navigate to="/todopage" />} /> {/* Correct way to use Navigate */}
      </Routes>
    </Router>
  );
}

export default App;