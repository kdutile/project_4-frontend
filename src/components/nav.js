// import {useState} from 'react'

// MUI COMPONENETS
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
// import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
// import Menu from '@mui/material/Menu';
// import MenuIcon from '@mui/icons-material/Menu';
// import Container from '@mui/material/Container';
// import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
// import Tooltip from '@mui/material/Tooltip';
// import MenuItem from '@mui/material/MenuItem';

const Nav = (props) => {

  return (

    <AppBar position="sticky">
      <Toolbar className="topnav">
        <Typography variant="h3" noWrap component="div" sx={{mr: 2, display: { xs: 'none', md: 'flex'} }}
        >
        MyStuffApp
        </Typography>

        <div className="tools">
          { props.showAdd && props.user ?   <Typography className="clickIcon" variant="h5" noWrap component="div" sx={{mr: 2, display: { xs: 'none', md: 'flex'} }} onClick={props.handleToggleAdd}
            >
            Return
            </Typography> : null }
          { !props.showAdd && props.user ?   <Typography className="clickIcon" variant="h5" noWrap component="div" sx={{mr: 2, display: { xs: 'none', md: 'flex'} }} onClick={props.handleToggleAdd}
            >
            Add Item
            </Typography> : null }
          { (!props.signUp && !props.user) ? <Button sx={{color:'blue',fontSize:'medium',border:'2px solid black', backgroundColor: 'lightblue'}} className="login" onClick={props.toggleSignUp} >Sign Up</Button> : null }
          { (props.signUp && !props.user) ? <Button sx={{color:'blue',fontSize:'medium',border:'2px solid black', backgroundColor: 'lightblue'}} className="login" onClick={props.toggleSignUp} >Cancel</Button> : null }
          { (!props.signIn && !props.user) ? <Button sx={{color:'blue',fontSize:'medium',border:'2px solid black', backgroundColor: 'lightblue'}} className="login" onClick={props.toggleSignIn} >Log In</Button> : null }
          { (props.signIn && !props.user) ? <Button sx={{color:'blue',fontSize:'medium',border:'2px solid black', backgroundColor: 'lightblue'}} className="login" onClick={props.toggleSignIn} >Cancel</Button> : null }
          { props.user ? <Button sx={{color:'blue',fontSize:'medium',border:'2px solid black', backgroundColor: 'lightblue'}} className="login" onClick={props.signOut}>Log Out</Button> : null }
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default Nav
