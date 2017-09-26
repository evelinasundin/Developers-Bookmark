import React, { Component } from "react";
import googleLogo from '../logos/google_signin.png'

const LoginForm = props => {
  return (
    <div className="loginform" style={{ maxWidth: "50%", margin: "5rem auto" }}>
      <form>
        <div className="form-group">
          <input
            type="text"
            name="email"
            className="form-control m-3"
            placeholder="Email"
            value={props.email}
            onChange={props.onChange}
          />
          <input
            type="password"
            name="password"
            className="form-control m-3"
            placeholder="Password"
            value={props.password}
            onChange={props.onChange}
          />
        </div>
      </form>
      <button className="btn btn-primary m-3" onClick={props.signIn}>
        Login
      </button>
      <img src={googleLogo} style={{ height: "40px" }} alt="Sign In with Google" onClick={props.signInWithGoogle} />
      <div className="form-control-feedback"> {props.error}</div> 
    </div>
  );
};

export default LoginForm;
