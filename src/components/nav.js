import {useState} from 'react'

// MUI COMPONENETS
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

const Nav = (props) => {

  return (
    <AppBar position="sticky">
      <Toolbar className="topnav">
        <Typography variant="h3" noWrap component="div" sx={{mr: 2, display: { xs: 'none', md: 'flex'} }}
        >
        MyStuffApp
        </Typography>
          {props.showAdd ?   <Typography className="clickIcon" variant="h5" noWrap component="div" sx={{mr: 2, display: { xs: 'none', md: 'flex'} }} onClick={props.handleToggleAdd}
            >
            Return
            </Typography> : <Typography className="clickIcon" variant="h5" noWrap component="div" sx={{mr: 2, display: { xs: 'none', md: 'flex'} }} onClick={props.handleToggleAdd}
              >
              Add Item
              </Typography>}

        <Button sx={{color:'blue',fontSize:'medium',border:'2px solid black', backgroundColor: 'lightblue'}} className="login">Log In</Button>
      </Toolbar>
    </AppBar>
  )
}

export default Nav
