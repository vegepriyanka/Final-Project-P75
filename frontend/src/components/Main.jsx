import { useEffect, useState } from 'react';
import Login from './SignIn';
import { Route, Routes } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import DashBoard from './Dashboard';
import Summary from './Summary';
import Report from './Report';

const Main = () => {
  const [token, setToken] = useState('');
  useEffect(() => {
    checkToken();
  }, []);
  
  const checkToken = () => {
    const token = localStorage.getItem('jwtToken');
    if (token && jwtDecode(token) && jwtDecode(token).exp > Date.now() / 1000) {
      setToken(token);
    } else {
      localStorage.removeItem('jwtToken');
      setToken('');
    }
  };

  return (
    <>
      <Routes>
        <Route
          path='/'
          element={!token ? <Login checkToken={checkToken} /> : <DashBoard />}
        />
        <Route
          path='dashboard'
          element={token ? <DashBoard /> : <Login checkToken={checkToken} />}
        />
        <Route
          path='summary'
          element={
            token ? (
              <Summary />
            ) : (
              <Login checkToken={checkToken} />
            )
          }
        />
        <Route
          path='report'
          element={
            token ? (
              <Report  />
            ) : (
              <Login checkToken={checkToken} />
            )
          }
        />
        <Route
          path='logout'
          element={<Login checkToken={checkToken} logOut={true} />}
        />
      </Routes>
    </>
  );
};

export default Main;
