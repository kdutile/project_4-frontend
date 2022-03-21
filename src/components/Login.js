import { useState } from "react";
// added because otherwise inputs broken
import {Input} from 'semantic-ui-react'

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
      <form id="sign-in" onSubmit={handleUserSubmit}>
        <Input type="text" placeholder="username" onChange={handleUsername}/>
        <Input type="password" placeholder="password" onChange={handlePassword}/>
        <Input type="submit"/>
      </form>
    </section>
  ) : (
    <section>
      <h2>Sign Up</h2>
      <form id="sign-up" onSubmit={handleUserSubmit}>
        <Input type="text" placeholder="username" onChange={handleUsername}/>
        <Input type="password" placeholder="password" onChange={handlePassword}/>
        <Input type="submit"/>
      </form>
    </section>

  )
};

export default Login;
