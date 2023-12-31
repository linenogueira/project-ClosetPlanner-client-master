import React, { useEffect } from 'react';
import {Link} from 'react-router-dom';
import {useContext} from 'react'; 
import { AuthContext } from '../../Context/auth.context';
import {useState} from "react"

import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';

import AccountCircle from '@mui/icons-material/AccountCircle';
import DryCleaningIcon from '@mui/icons-material/DryCleaning';
import LuggageIcon from '@mui/icons-material/Luggage';




function CustomNavbar() {
  const {isLoggedIn, user, logOutUser} = useContext(AuthContext);
  return (
    <nav className="navbar-container">
   
      <div>
        <Link to="/clothing" className='link'>
          Closet
        </Link>
      </div>
      {isLoggedIn ? (
        <div>
          <a href="#" onClick={logOutUser} className='link'>Logout</a>
        
        </div>
      ) : (
        <div>
          <Link to="/login" className='link'>
            Login
          </Link>
          <Link to="/signup" className='link'>
           Signup
          </Link>
        </div>
      )}
    </nav>
  );
}

function Navbar() {
  const {isLoggedIn, user, logOutUser, storeToken, authenticateUser} = useContext(AuthContext);

   const storedToken = localStorage.getItem("authToken");
   const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    useEffect(() => {}, [user] );

  
    const handleProfileMenuOpen = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleMobileMenuClose = () => {
      setMobileMoreAnchorEl(null);
    };
  
    const handleMenuClose = () => {
      setAnchorEl(null);
      handleMobileMenuClose();
    };
  
    const handleMobileMenuOpen = (event) => {
      setMobileMoreAnchorEl(event.currentTarget);
    };
   
  
    const menuId = 'primary-search-account-menu';
    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        id={menuId}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}> <Link to="/clothing" className='link'>
          My Closet
          
        </Link></MenuItem>
        <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      </Menu>
    );
  
    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
      >
        
        <MenuItem>
        
          <IconButton size="small" aria-label="show 4 new mails" color="inherit">
           
          <Link to='/laundry'>
            
            < Badge badgeContent={user?.laundry?.length} color="error">
            
              <DryCleaningIcon />
             
            </Badge>
            </Link>
            
          </IconButton>
          

          <p>Laundry</p>
        </MenuItem>

        <MenuItem>
          <IconButton
            size="small"
            aria-label="show 17 new notifications"
            color="inherit"
          >
             
            <Badge badgeContent={user?.packing?.length} color="error">
              <LuggageIcon/>
            </Badge>
          </IconButton>
          <p>Luggage</p>
        </MenuItem>
      

         <Link to="/clothing" >
         <p className="mobile-link">My Closet</p> 
        </Link>
        <Link to="/signup" className='l'>
           Signup
          </Link>
          <Link to="/login" className='l'>
            Login
          </Link>
        <MenuItem onClick={handleProfileMenuOpen}>
       
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
          
        </MenuItem>
      </Menu>
    ); 
  
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed" sx={{ backgroundColor: "#f8f8f8"}}>
          <Toolbar>
     
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: 'flex', sm: 'block' } }}
            >
        
           <Link to='/' className='nav-logo'><strong><p>MY CLOSET</p></strong></Link>
            </Typography>
           
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: 'flex', md: 'flex' } }}>
              <IconButton size="small" aria-label="show 4 new mails" color="inherit">
                <Link to='/laundry' className='laundry-link'>
                <Badge badgeContent={user?.laundry?.length || 0} color='primary' style={{color: 'gray'}}>
                  <DryCleaningIcon />
                </Badge>
                </Link>
              </IconButton>
              <IconButton
                size="small"
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <Link to='/packing' className='packing-link'>
                <Badge badgeContent={user?.packing?.length} color='primary' style={{color: 'gray'}}>
                  <LuggageIcon />
                </Badge>
                </Link>
                
              </IconButton>
             
            <CustomNavbar /> 
            </Box>
        
          </Toolbar>
        </AppBar>
     
        {renderMenu}
        
      </Box>
    );

}
export default Navbar;