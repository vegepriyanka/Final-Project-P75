import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const navItems = ['Dashboard', 'Summary', 'Report', 'Logout'];

const NavBar = (props) => {
  return (
    <>
      <AppBar component='nav'>
        <Toolbar>
          <Typography variant='h6' component='div'>
            P75
          </Typography>
          <Box>
            {navItems.map((item) => (
              <Link to={item !== 'Dashboard' ? `/${item.toLowerCase()}` : '/'}>
                <Button key={item} sx={{ color: '#fff' }}>
                  {item}
                </Button>
              </Link>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <nav></nav>
    </>
  );
};
export default NavBar;
