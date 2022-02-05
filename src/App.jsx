import { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import { GlobalContextProvider } from './contexts/GlobalContext';
import ProtectedRoute from './components/ProtectedRoutes';
import Dashboard from './components/Dashboard';
import UpdateDriver from './components/UpdateDriver';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <h1>Welcome to Fuelmetrics!</h1>
      <GlobalContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/updatedriver" element={<UpdateDriver />} />
          </Route>
        </Routes>
      </GlobalContextProvider>
    </div>
  );
}

export default App;

// jones_indie@mailinator.com
// password123
