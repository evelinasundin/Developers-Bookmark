import React, { Component } from 'react';
import './App.css';
import firebase from './Firebase'
import Navbar from './components/Navbar'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import CreatePost from './components/CreatePost'

const db = firebase.database();

class App extends Component {

  state = {
    allPosts: [],
    username: "",
    password: "",
    user: "",
    showLoggedIn: false,
    showRegister: false 
  };

  componentDidMount() {

    firebase
    .database()
    .ref("allPosts")
    .on("value", snapshot => {
      let sortedList = [];
      snapshot.forEach(item => {
      sortedList.push(item.val());
    });
    this.setState({ allPosts: snapshot.val() });
    console.log(snapshot.val());
  });

  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      this.setState({ user: user });
      console.log(user);
    } else {
      this.setState({ user: "" });
    }
  });

};

  //när showloggedin === true då ska showRegister vara false

  toggleLogin = () => {
    this.setState({showLoggedIn : !this.state.showLoggedIn, showRegister : false});
  };

  //när showRegister === true då ska showLoggedIn vara false

  toggleRegister = () => {
    this.setState ({showRegister : !this.state.showRegister, showLoggedIn : false});
  };

  addPost = () => {

    const post = {

      title: "",
      description: "",
      date: new Date().toLocaleString(),
      url: "", 
      img: "",
    };

    db.ref("allPosts").push(post);

  };

  createUser = e => {
    e.preventDefault(); 
    firebase
    .auth()
    .createUserWithEmailAndPassword(this.state.username, this.state.password)
    .then(user => console.log("created", user))
    .catch(error => console.log(error));
  };

  onChange = e => this.setState ({ [e.target.name]: e.target.value}); 

  signIn = () => {
    firebase.auth()
    .signInWithEmailAndPassword(this.state.username, this.state.password)
    .then(user => console.log("you are signed in", user))
    .catch(error => console.log(error))
  };

  signOut = () => {
    firebase.auth().signOut();
  }

  render() {
    return (
      <div className="App">
         {/* <Posts state={this.state}/> */}
         <div className="color-container">
           <Navbar toggleLogin={this.toggleLogin} toggleRegister={this.toggleRegister} />
           { (this.state.showLoggedIn && !this.state.showRegister ) && <LoginForm username={this.state.username} password={this.state.password} signIn={this.signIn} onChange={this.onChange} /> }
           { (!this.state.showLoggedIn &&  this.state.showRegister ) && <RegisterForm username={this.state.username} password={this.state.password} createUser={this.createUser}  onChange={this.onChange} /> }
           <p className="heading"> 
           Bookmark <p className="bigletter">&</p> share your favorite websites with other developers, designers <p className="bigletter">&</p>  creatives
             </p>
         <div className="box">
           </div> 
             </div>
             <CreatePost />
      </div>
    );
  }
}

export default App;
