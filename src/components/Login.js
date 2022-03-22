import { useState } from "react";
// added because otherwise inputs broken
import {Input} from 'semantic-ui-react'
import Box from '@mui/material/Box';
const Login = (props) => {
  // Hooks
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  //Event handlers
  const handleUsername = (event) => {
      setUsername(event.target.value);
  };
  const handlePassword = (event) => {
      setPassword(event.target.value);
  };

  const handleUserSubmit = (event) => {
      event.preventDefault();
      if (props.signIn) {
        props.handleUserSignIn(username, password);
        document.getElementById("sign-in").reset();
      } else {
        props.handleUserSignUp(username, password);
        document.getElementById("sign-up").reset();
      }
  };

  return (props.signIn) ? (
    <section>
      <h2>Sign In</h2>
      <Box
        className = "form"
        id="sign-in"
        onSubmit={handleUserSubmit}
        component="form"
        sx={{
          '& > :not(style)': {m:1},
        }}
        noValidate
      >
        <Input type="text" placeholder="username" onChange={handleUsername}/>
        <Input type="password" placeholder="password" onChange={handlePassword}/>
        <Input type="submit"/>
      </Box>
    </section>
  ) : (
    <section>
      <h2>Sign Up</h2>
      <Box
        className = "form"
        id="sign-up"
        onSubmit={handleUserSubmit}
        component="form"
        sx={{
          '& > :not(style)': {m:1},
        }}
        noValidate
      >
        <Input type="text" placeholder="username" onChange={handleUsername}/>
        <Input type="password" placeholder="password" onChange={handlePassword}/>
        <Input type="submit"/>
      </Box>
    </section>

  )
};

export default Login;
