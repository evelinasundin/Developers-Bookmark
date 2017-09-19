import React, { Component } from 'react';


const RegisterForm = (props) => {
    return (
        <div className="registerform" style={{maxWidth: "50%", margin: "5rem auto"}}>
        <form onSubmit={props.createUser}>
          <div className="form-group">
            <input
              type="text"
              name="username"
              className="form-control m-3"
              placeholder="Email"
              value= {props.username}
              onChange= {props.onChange}

            />
            <input
              type="text"
              name="password"
              className="form-control m-3"
              placeholder="Password"
              value={props.password}
              onChange={props.onChange}
            />
          </div>
          <input
            type="submit"
            value="Register"
            className="btn btn-primary m-3"
          />
        </form>
      </div>

)



}

export default RegisterForm;