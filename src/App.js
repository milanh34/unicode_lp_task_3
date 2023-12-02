import './App.css';
import { useState } from "react";
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import Navbar from './components/Navbar';
import {Route, Routes, BrowserRouter as Router} from 'react-router-dom';

function App() {
  const [userInfo, setUserInfo] = useState('');
  const getData = (data) => {
    console.log("App : ", data);
    setUserInfo(data);
  };
  const logout = () => {
    setUserInfo("");
  }
  return (
    <Router basename="/unicode_lp_task_3">
    <Navbar login={userInfo? "Logout" : "Login"} onLogout={logout} user={userInfo}/>
      <Routes>
        <Route
          exact path="/unicode_lp_task_3"
          element={<Home user={userInfo} />}
        />
        <Route path="/login" element={<Login onSubmit={getData} />} />
        <Route path="/signup" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;