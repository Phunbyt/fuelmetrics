import React, { useContext, useEffect } from 'react';
import api from '../../constants';
import GlobalContext from '../contexts/GlobalContext';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { password, setPassword, email, setEmail, isLoading, setIsLoading } =
    useContext(GlobalContext);
  const navigateTo = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data } = await api.post('/login', { password, email });

      localStorage.setItem('authToken', data.token);

      navigateTo('/dashboard');
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
        />
        <br />
        <br />
        <input
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
        />
        <br />
        <br />
        <button type="submit">{isLoading ? 'Loading...' : 'Login'}</button>
      </form>
    </div>
  );
};

export default Home;
