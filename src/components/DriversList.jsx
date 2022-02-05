import React, { useContext, useState } from 'react';
import GlobalContext from '../contexts/GlobalContext';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import api from '../../constants';

const DriversList = ({ driver }) => {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { company, config, reRender, setReRender, handleSeletedDriver } =
    useContext(GlobalContext);

  const deleteADriver = async (id) => {
    setIsLoading(true);

    try {
      const { data } = await api.delete(
        `/Driver/Delete/${company.id}/${id}`,
        config
      );

      setIsLoading(false);
      console.log(data);
      alert(data.message);
      setReRender(!reRender);
    } catch (error) {
      console.log(error);
      setMessage(error.message);
      setReRender(!reRender);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h3>{driver.name}</h3>
      <p>{driver.email}</p>
      <p>{driver.phone}</p>
      <p>{driver.state}</p>
      <button onClick={() => deleteADriver(driver.id)}>
        {isLoading ? 'Loading...' : 'Delete'}
      </button>
      <button onClick={() => handleSeletedDriver(driver)}>Update</button>
      <hr />
    </div>
  );
};

export default DriversList;
