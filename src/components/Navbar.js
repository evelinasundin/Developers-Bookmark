import React, { Component } from "react";
import logo from "../logos/logo-pink.png";

const Navbar = props => {
  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-faded">
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#nav-content"
        aria-controls="nav-content"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>

      <a className="navbar-brand" href="">
        {" "}
        <img style={{ height: "90px" }} src={logo} alt="dblogo" />{" "}
      </a>
      <a className="navbar-brand notlogged" href="">
        Developer's Bookmark
      </a>

      <div className="collapse navbar-collapse" id="nav-content">
        <ul className="navbar-nav ml-auto">
          {/* if user is not loged in*/}
          {!props.user && (
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={props.toggleLogin}>
                Login
              </a>
            </li>
          )}
          {/*if user is not loged in*/}
          {!props.user && (
            <li className="nav-item">
              <a className="nav-link " href="#" onClick={props.toggleRegister}>
                Register
              </a>
            </li>
          )}
          {/*if user is loged in */}
          {props.user && (
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={props.signOut}>
                Log Out
              </a>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
