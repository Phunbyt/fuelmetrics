import React, { useState, useContext } from 'react';
import GlobalContext from '../contexts/GlobalContext';
import axios from 'axios';
import api from '../../constants';

const DriverForm = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const { company, config } = useContext(GlobalContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data } = await api.post(
        `/Driver/Add/${company.id}`,
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
        <h1>{message}</h1>
      ) : (
        <form onSubmit={handleSubmit}>
          <br />
          <br />
          <input
            required
            placeholder="Name"
            name="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <br />
          <input
            required
            placeholder="phone"
            name="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <br />
          <br />
          <input
            required
            placeholder="email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <br />
          <input
            required
            placeholder="address"
            name="address"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <br />
          <br />
          <input
            required
            placeholder="city"
            name="city"
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <br />
          <br />
          <input
            required
            placeholder="state"
            name="state"
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
          <br />
          <br />
          <button type="submit">
            {isLoading ? 'Loading...' : 'Add Driver'}
          </button>
        </form>
      )}
    </div>
  );
};

export default DriverForm;
