import React from 'react';
import logo from './logo.svg';
import { Header } from './share/components/header/index';
import { ErrorApi } from './share/errors/ErrorApi';
import { Videos } from './components/videos/index';
import './App.scss';
import './stylesheet/styles.scss';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
function App() {
  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const isLoggedIn = localStorage.getItem('accessToken')

    if (!isLoggedIn) {
      return <Navigate to="/" replace />;
    }

    return children;
  };

  return (
    <div className="App">
      <Router>
        <ErrorApi />
        <Header />
        <Videos />
        <Routes>
          
        </Routes>
      </Router>
    </div>
  );
}

export default App;
