import React, { Component } from "react";
import googleLogo from '../logos/google_signin.png'

const RegisterForm = props => {
  return (
    <div
      className="registerform"
      style={{ maxWidth: "50%", margin: "5rem auto" }}
    >
      <form onSubmit={props.createUser}>
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
          <input
            type="text"
            name="displayName"
            className="form-control m-3"
            placeholder="Name"
            value={props.displayName}
            onChange={props.onChange}
          />
        </div>
        <input type="submit" value="Register" className="btn btn-primary m-3" />
      </form>
      <img src={googleLogo} style={{ height: "40px" }} alt="Sign In with Google" onClick={props.signInWithGoogle} />

      <div className="form-control-feedback"> {props.error}</div> 
    </div>
  );
};

export default RegisterForm;
