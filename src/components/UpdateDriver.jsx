import React, { useState, useContext } from 'react';
import GlobalContext from '../contexts/GlobalContext';
import axios from 'axios';
import api from '../../constants';

import { useNavigate } from 'react-router-dom';

const UpdateDriver = () => {
  const { company, config, driver } = useContext(GlobalContext);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState(driver.phone);
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigateTo = useNavigate();

  const returnToDashboard = () => {
    navigateTo('/dashboard');
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data } = await api.put(
        `/Driver/Edit/${company.id}/${driver.id}`,
        {
          userId: company.userId,
          companyId: company.id,
          name,
          phone,
          email,
          address,
          city,
          state,
          roles: ['Driver'],
        },
        config
      );

      setMessage(data.message);
      setName('');
      setPhone('');
      setEmail('');
      setAddress('');
      setCity('');
      setState('');
      setIsLoading(false);
    } catch (error) {
      setMessage(error.message);
      setIsLoading(false);
    }
  };
  return (
    <div>
      {message ? (
        <>
          <h1>{message}</h1>
          <button onClick={returnToDashboard}>Return to Dashboard</button>
        </>
      ) : (
        <form onSubmit={handleSubmit}>
          <button onClick={returnToDashboard}>Return to Dashboard</button>
          <br />
          <br />
          <p>{driver.name}</p>
          <input
            placeholder="Name"
            name="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <br />

          <p>{driver.phone}</p>
          <input
            placeholder="phone"
            name="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <br />
          <br />

          <p>{driver.email}</p>
          <input
            placeholder="email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <br />

          <p>{driver.address}</p>
          <input
            placeholder="address"
            name="address"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <br />
          <br />

          <p>{driver.city}</p>
          <input
            placeholder="city"
            name="city"
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <br />
          <br />

          <p>{driver.state}</p>
          <input
            placeholder="state"
            name="state"
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
          <br />
          <br />
          <button type="submit">
            {isLoading ? 'Loading...' : 'Update Driver Details'}
          </button>
        </form>
      )}
    </div>
  );
};

export default UpdateDriver;
