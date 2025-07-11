import React, { useState } from 'react';
import Register from './components/Register';
import Login from './components/Login';
import Home from './pages/Main'


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [showRegister, setShowRegister] = useState(false);

  if (!isLoggedIn) {
    return showRegister ? (
      <>
        <Register onRegister={() => setIsLoggedIn(true)} />
        <p className="text-center mt-4">
          Already have an account?{' '}
          <button onClick={() => setShowRegister(false)} className="text-green-600 font-medium">
            Login
          </button>
        </p>
      </>
    ) : (
      <>
        <Login onLogin={() => setIsLoggedIn(true)} />
        <p className="text-center mt-4">
          Don't have an account?{' '}
          <button onClick={() => setShowRegister(true)} className="text-green-600 font-medium">
            Register
          </button>
        </p>
      </>
    );
  }

  return <Home onLogout={() => setIsLoggedIn(false)} />;
}

export default App;
