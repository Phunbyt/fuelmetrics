import { useEffect, useState, createContext } from 'react';
import { useNavigate } from 'react-router-dom';

const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const navigateTo = useNavigate();
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [reRender, setReRender] = useState(false);

  const [company, setCompany] = useState({});
  const [driver, setDriver] = useState({});

  const handleSeletedDriver = (driver) => {
    setDriver(driver);
    navigateTo('/updatedriver');
  };

  const token = localStorage.getItem('authToken');
  const config = {
    headers: {
      'Content-type': 'application/json',
      Authorization: `bearer ${token}`,
    },
  };

  const contextValues = {
    isLoading,
    setIsLoading,
    password,
    setPassword,
    email,
    setEmail,
    company,
    setCompany,
    config,
    reRender,
    setReRender,
    handleSeletedDriver,
    driver,
  };
  return (
    <GlobalContext.Provider value={contextValues}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
