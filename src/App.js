import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Welcome from './Components/Welcome';
import Login from './Components/Login';
import Todopage from './Components/TodoPage';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const [isLoggedin, setIsLoggedin] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/login" element={<Login setIsLoggedin={setIsLoggedin} />} />
        <Route path="/todopage" element={isLoggedin ? <Todopage /> : <Navigate to="/TodoPage" />} />
        <Route path="*" element={<Navigate to="/welcome" />} />
      </Routes>
    </Router>
  );
}

export default App;

