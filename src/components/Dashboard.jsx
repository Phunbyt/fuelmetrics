import React, { useEffect, useState, useContext } from 'react';
import api from '../../constants';
import axios from 'axios';
import GlobalContext from '../contexts/GlobalContext';
import DriversList from './DriversList';
import DriverForm from './DriverForm';

const Dashboard = () => {
  const [companyDrivers, setCompanyDrivers] = useState([]);
  const [gettingAllDrivers, setGettingAllDrivers] = useState(false);
  const [addADriver, setaddADriver] = useState(false);
  const { isLoading, setIsLoading, company, setCompany, config, reRender } =
    useContext(GlobalContext);

  const getAllDrivers = async () => {
    setGettingAllDrivers(true);
    setaddADriver(false);

    try {
      const { data } = await api.get(
        `Drivers/All?count=true&companyId=${company.id}`,
        config
      );
      setCompanyDrivers(data.sort((a, b) => a.name.localeCompare(b.name)));
      setGettingAllDrivers(false);
    } catch (error) {
      setGettingAllDrivers(false);
    }
  };
  const addCompanyDriver = () => {
    setaddADriver(true);
    setCompanyDrivers([]);
  };

  useEffect(() => {
    getAllDrivers();
  }, [reRender]);
  useEffect(async () => {
    setIsLoading(true);

    try {
      const { data } = await api.get('/Company/Details', config);

      setCompany(data.data.company);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  }, []);
  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div>
            <h3>{company.name}</h3>
            <h3>{company.address}</h3>
            <h3>{company.state}</h3>
          </div>

          <button onClick={getAllDrivers}>View Drivers</button>
          <button onClick={addCompanyDriver}>Add A New Driver</button>

          <br />
          <br />
          <br />
          <br />

          <div>
            {gettingAllDrivers ? (
              <h3>Getting Company Dirvers</h3>
            ) : (
              <div>
                {companyDrivers &&
                  companyDrivers.map((driver) => (
                    <DriversList key={driver.id} driver={driver} />
                  ))}
              </div>
            )}
          </div>

          <div>{addADriver && <DriverForm />}</div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
