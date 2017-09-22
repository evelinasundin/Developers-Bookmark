import React, { Component } from "react";
import "./App.css";
import firebase from "./Firebase";
import Navbar from "./components/Navbar";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import CreatePost from "./components/CreatePost";
import ListPosts from "./components/ListPosts";
import SearchField from "./components/SearchField";
import SelectField from "./components/SelectField";

const db = firebase.database();
const at = firebase.auth();

class App extends Component {
  state = {
    allPosts: [],
    username: "",
    password: "",
    user: "",
    uid: "",
    showLoggedIn: false,
    showRegister: false,
    searchTerm: "",
    category: "",
    postsByCategory: [],
    displayName: ""
  };

  componentDidMount() {
    db.ref("allPosts").on("value", snapshot => {
      const posts = toArray(snapshot.val());
      this.setState({ allPosts: posts });
      console.log(this.state.allPosts);
    });

    at.onAuthStateChanged(user => {
      if (user) {
        this.setState({ user: user, uid: user.uid });
        console.log(user);
        //kollar så usersavedposts hålls uppdaterat
        firebase
          .database()
          .ref(`users/${user.uid}/userSavedPosts`)
          .on("value", snapshot => {});
      } else {
        this.setState({ user: "" });
      }
    });
  }

  //när showloggedin === true då ska showRegister vara false

  toggleLogin = () => {
    this.setState({
      showLoggedIn: !this.state.showLoggedIn,
      showRegister: false
    });
  };

  //när showRegister === true då ska showLoggedIn vara false

  toggleRegister = () => {
    this.setState({
      showRegister: !this.state.showRegister,
      showLoggedIn: false
    });
  };

  addPost = () => {
    const post = {
      title: this.state.titleValue,
      description: this.state.descriptionValue,
      date: new Date().toLocaleString(),
      url: this.state.urlValue,
      category: this.state.categoryValue,
      userID: this.props.uid
    };

    db.ref("allPosts").push(post);
  };

  filterByCategory = e => {
    const postsByCategory = this.state.allPosts.filter(post => {
      return post.value.category.includes(e.target.value);
    });
    this.setState({
      postsByCategory: postsByCategory,
      category: e.target.value
    });
  };

  createUser = e => {
    e.preventDefault();
    at
      .createUserWithEmailAndPassword(this.state.username, this.state.password)
      .then(user => {
        user
          .updateProfile({
            displayName: this.state.displayName
          })
          .then(() => {
            db
              .ref(`users/${user.uid}`)
              .set({
                username: user.email,
                uid: user.uid,
                displayName: user.displayName
              }); //om ett värde inte finns komer det bli null i firebase
          });
      })
      .catch(error => console.log(error));
  };

  //gets chosen post from onClick function on Save Button in ListPosts
  savePost = chosenPost => {
    console.log(chosenPost);

    //gets current user and pushes chosenPost into new array calles usersSavedPosts which is created here
    db.ref(`users/${this.state.user.uid}/userSavedPosts`).push(chosenPost);
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  signIn = () => {
    at
      .signInWithEmailAndPassword(this.state.username, this.state.password)
      .then(user => console.log("you are signed in", user))
      .catch(error => {
        this.setState({ error });
      });
  };

  signOut = () => {
    at.signOut();
  };

  render() {
    console.log(this.state.allPosts);

    const { category, postsByCategory, allPosts, searchTerm } = this.state;

    let postsToRender = category ? postsByCategory : allPosts;

    postsToRender = searchTerm
      ? postsToRender.filter(post =>
          post.value.description
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        )
      : postsToRender;

    console.log(postsToRender);

    console.log(this.state.user);

    return (
      <div className="App">
        {/* <Posts state={this.state}/> */}
        <div className="color-container">
          <Navbar
            toggleLogin={this.toggleLogin}
            toggleRegister={this.toggleRegister}
            user={this.state.user}
            signOut={this.signOut}
          />

          {/* visa om inte usern är inloggad och när showLoggedIn är true men inte showRegister */}
          {!this.state.user &&
          (this.state.showLoggedIn && !this.state.showRegister) && (
            <LoginForm
              username={this.state.username}
              password={this.state.password}
              signIn={this.signIn}
              onChange={this.onChange}
              error={this.state.errorMessage}
            />
          )}
          {/* visa om inte usern är inloggad och när showLoggedIn inte är true men showRegister är true */}
          {!this.state.user &&
          (!this.state.showLoggedIn && this.state.showRegister) && (
            <RegisterForm
              username={this.state.username}
              password={this.state.password}
              createUser={this.createUser}
              onChange={this.onChange}
              error={this.state.errorMessage}
              displayName={this.state.displayName}
            />
          )}
          {!this.state.user &&
          (!this.state.showLoggedIn && !this.state.showRegister) && (
            <p className="heading">
              {" "}
              Bookmark <p className="bigletter">&</p> share your favorite
              websites with other developers, designers and creatives.{" "}
            </p>
          )}
          {this.state.user && (
            <p className="heading">
              {" "}
              {/* if not user.display is updated write state displayname which holds info what user wrote */}
              Welcome{" "}
              {this.state.user.displayName ? (
                this.state.user.displayName
              ) : (
                this.state.displayName
              )}! <p className="subheading"> Let's get started! </p>{" "}
            </p>
          )}
          <div className="box" />
          {!this.state.user && <i className="fa fa-github-square fa-4x" aria-hidden="true" /> }
        </div>
        {this.state.user && (
          <SearchField
            name="searchTerm"
            value={this.state.searchTerm}
            onChange={this.onChange}
            renderSearchPosts={this.renderSearchPosts}
          />
        )}
        {this.state.user && (
          <SelectField onChange={this.filterByCategory} value={category} />
        )}
        {this.state.user && <CreatePost uid={this.state.uid} />}
        {this.state.user && (
          <ListPosts
            allPosts={this.state.allPosts}
            data={postsToRender}
            savePost={this.savePost}
            onChange={this.onChange}
          />
        )}
      </div>
    );
  }
}

// function that push firebase objects into array

function toArray(firebaseObject) {
  let array = [];
  for (let item in firebaseObject) {
    array.push({
      key: item,
      value: firebaseObject[item]
    });
  }
  return array;
}
export default App;
