import React, { useEffect } from 'react';
import { Grid, TextField, Button, CircularProgress } from '@material-ui/core';
import NavBar from './NavBar';
import axios from 'axios';

const LogIn = (props) => {
  const [userName, setUserName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  useEffect(() => {
    if (props.logOut) {
      localStorage.removeItem('jwtToken');
      props.checkToken();
      if (typeof window !== 'undefined') {
        window.location.href = '/';
      }
    }
  }, [props]);

  const handelUserNameChange = (e) => {
    if (e && e.target) {
      setUserName(e.target.value ?? '');
    }
  };

  const handlePasswordChange = (e) => {
    if (e && e.target) {
      setPassword(e.target.value ?? '');
    }
  };

  const onSubmit = async () => {
    console.log(userName, password);
    setIsLoading(true);
    const data = {
      username: userName,
      password: password,
    };

    const url = 'https://final-project-p75-backend.onrender.com/api/login';
    try {
      const resp = await axios.post(url, data).catch((err) => {
        console.log(err);
      });

      console.log(resp);

      if (resp && resp.status === 200) {
        const token = resp.data.token;
        localStorage.setItem('jwtToken', token);
        props.checkToken();
        setIsLoading(false);
      } else {
        setIsLoading(false);
        alert('Invalid creditenals');
      }
    } catch (e) {
      setIsLoading(false);
      alert('Something went wrong');
      console.error(e);
    }
  };

  return (
    <>
      <NavBar />
      <Grid align='center' style={{ paddingTop: '120px' }}>
        <h2>Log In</h2>
      </Grid>
      <Grid
        container
        spacing={1}
        direction='column'
        alignItems='center'
        style={{ minWidth: '200vh' }}
      >
        {isLoading && <CircularProgress />}
        <TextField
          label='Username'
          placeholder='Enter username'
          variant='outlined'
          required
          onChange={handelUserNameChange}
          value={userName}
          style={{ paddingBottom: '20px' }}
          inputProps={{
            'aria-label': 'Enter username',
          }}
        />
        <TextField
          label='Password'
          placeholder='Enter password'
          type='password'
          variant='outlined'
          required
          onChange={handlePasswordChange}
          value={password}
          style={{ paddingBottom: '20px' }}
          inputProps={{
            'aria-label': 'Enter password',
          }}
        />
        <Button
          type='submit'
          color='primary'
          variant='contained'
          onClick={onSubmit}
        >
          Sign in
        </Button>
      </Grid>
    </>
  );
};

export default LogIn;
