import React, { Component } from 'react';
import logo from '../logos/logo-pink.png';

const Navbar = (props) => {
    return (

<nav className="navbar navbar-expand-sm navbar-light bg-faded">
<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#nav-content" aria-controls="nav-content" aria-expanded="false" aria-label="Toggle navigation">
<span className="navbar-toggler-icon"></span>
</button>


<a className="navbar-brand" href=""> <img style={{height: "100px"}} src={logo} />  </a>


<div className="collapse navbar-collapse" id="nav-content">   
<ul className="navbar-nav ml-auto">
{/*om INTE användaren är inloggad*/}
{!props.user && 
<li className="nav-item">
<a className="nav-link" href="#" onClick={props.toggleLogin}>Login</a>
</li>
}
{/*om INTE användaren är inloggad*/}
{!props.user &&
<li className="nav-item">
<a className="nav-link " href="#" onClick={props.toggleRegister}>Register</a>
</li>
}
{/*om användaren ÄR inloggad*/}
{props.user && <li className="nav-item">
<a className="nav-link" href="#" onClick={props.signOut}>Log Out</a>
</li>
}
{/*om användaren ÄR inloggad*/}
{/*{props.user &&
<li className="nav-item"> 
<p> Welcome  {props.user.email}! </p>
</li>
*/}
</ul>
</div>
</nav>

)



}

export default Navbar;