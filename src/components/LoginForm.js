import React, { Component } from "react";

const LoginForm = props => {
  return (
    <div className="loginform" style={{ maxWidth: "50%", margin: "5rem auto" }}>
      <form>
        <div className="form-group">
          <input
            type="text"
            name="username"
            className="form-control m-3"
            placeholder="Email"
            value={props.username}
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
    </div>
  );
};

export default LoginForm;
