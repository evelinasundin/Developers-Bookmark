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
import ListSavedPosts from "./components/ListSavedPosts";
import logo from "./logos/logo-pink.png";

//deconstruct firebase commands

const db = firebase.database();
const at = firebase.auth();

class App extends Component {
  state = {
    allPosts: [],
    email: "",
    password: "",
    user: "",
    uid: "",
    showLoggedIn: false,
    showRegister: false,
    searchTerm: "",
    category: "",
    postsByCategory: [],
    savedPostsByCategory: [],
    displayName: "",
    allUsers: [],
    userSavedPosts: [],
    error: {
      message: ""
    },
    showWritePost: false,
    showSavedPosts: false
  };

  //listens to when a post is added in database - callback returns added object

  componentDidMount() {
    db.ref("allPosts").on("child_added", snapshot => {
      const newPost = {
        value: snapshot.val(),
        key: snapshot.key
      };
      this.setState({ allPosts: [...this.state.allPosts, newPost] });
    });

    //listens to when a post is being removed from database - callback returns removed object

    db.ref("allPosts").on("child_removed", snapshot => {
      let posts = this.state.allPosts.filter(item => {
        return item.key !== snapshot.key;
      });
      this.setState({ allPosts: posts });
    });

    //functions that listens to when users in database is being updated/changed or added in database

    db.ref("users").on("child_added", snapshot => {
      const newUser = {
        value: snapshot.val(),
        key: snapshot.key
      };
      this.setState({ allUsers: [...this.state.allUsers, newUser] });
    });

    //listens to when a user object is being changed/updated

    db.ref("users").on("child_changed", snapshot => {
      let updateusers = this.state.allUsers.map(item => {
        if (item.key === snapshot.key) {
          return Object.assign({}, item, { value: snapshot.val() }); //Object assign === merge the old object with the new object.
        } else return item;
      });
      this.setState({ allUsers: updateusers });
    });

    // listens to when user saves a post and pushes the saved post into savedpostarray
    //since you cant remove or change these posts child_added is the only listener needed

    at.onAuthStateChanged(user => {
      if (user) {
        this.setState({ user: user, uid: user.uid });
        db
          .ref(`users/${user.uid}/userSavedPosts`)
          .on("child_added", snapshot => {
            const userSavedPost = {
              value: snapshot.val(),
              key: snapshot.key
            };
            this.setState({
              userSavedPosts: [...this.state.userSavedPosts, userSavedPost]
            });
          });
      } else {
        this.setState({ user: "" });
      }
    });
  }

  //all toggle functions - to be able to show and hide elements in app

  //when showLoggedin === true, showRegister === false, toggles

  toggleLogin = () => {
    this.setState({
      showLoggedIn: !this.state.showLoggedIn,
      showRegister: false
    });
  };

  //when showRegister === true, showLoggedIn === false

  toggleRegister = () => {
    this.setState({
      showRegister: !this.state.showRegister,
      showLoggedIn: false
    });
  };

  toggleShowSavedPosts = () => {
    this.setState({
      showSavedPosts: !this.state.showSavedPosts
    });
  };

  toggleShowWritePost = () => {
    this.setState({
      showWritePost: !this.state.showWritePost
    });
  };

  //gets parameter from searchfield.js and filters the posts that contains the selected category
  //and pushes it into state postsByCategory

  filterByCategory = e => {
    const postsByCategory = this.state.allPosts.filter(post => {
      return post.value.category.includes(e.target.value);
    });

    this.setState({
      postsByCategory: postsByCategory,
      category: e.target.value
    });
  };

  // google sign in

  signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    at
      .signInWithPopup(provider)
      .then(result => {
        const user = result.user;
        db()
          .ref(`users/${user.uid}`)
          .set({ email: user.email, uid: user.uid });
      })
      .catch(error => {
        this.setState({ hasError: true });
        this.setState({ error: error.message });
        // console.log(error)
      });
  };

  //function that creates user and pushes created user into users in database, also sets displayName

  createUser = e => {
    // console.log("hej");
    e.preventDefault();
    at
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(user => {
        user
          .updateProfile({
            displayName: this.state.displayName
          })
          .then(() => {
            db.ref(`users/${user.uid}`).set({
              email: user.email,
              uid: user.uid,
              displayName: user.displayName
            }); //om ett värde inte finns komer det bli null i firebase
          });
      })
      .catch(error => {
        this.setState({ error });
      });
  };

  //gets chosen post from onClick function on Save Button in ListPosts.js
  savePost = chosenPost => {
    //gets current user and pushes chosenPost into userSavedPost which also is created here if user does not have any saved posts yet
    db.ref(`users/${this.state.user.uid}/userSavedPosts`).push(chosenPost);
  };

  //remove chosen post in database. function is being called in ListPost.js

  removePost = item => {
    db.ref(`allPosts/${item}`).remove();
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  signIn = () => {
    at
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(user => console.log("you are signed in", user))
      .catch(error => {
        this.setState({ error });
      });
  };

  signOut = () => {
    at.signOut();
  };

  render() {
    //deconstruct functions
    const {
      toggleLogin,
      toggleRegister,
      toggleShowSavedPosts,
      toggleShowWritePost,
      filterByCategory,
      signInWithGoogle,
      createUser,
      savePost,
      removePost,
      onChange,
      signIn,
      signOut
    } = this;

    //deconstruct state

    const {
      allPosts,
      email,
      password,
      user,
      uid,
      showLoggedIn,
      showRegister,
      searchTerm,
      category,
      postsByCategory,
      savedPostsByCategory,
      displayName,
      allUsers,
      userSavedPosts,
      showWritePost,
      showSavedPosts
    } = this.state;

    let postsToRender = category ? postsByCategory : allPosts;

    postsToRender = searchTerm
      ? postsToRender.filter(post =>
          post.value.description
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        )
      : postsToRender;

    return (
      <div className="App">
        <div className="color-container">
          <Navbar
            toggleLogin={toggleLogin}
            toggleRegister={toggleRegister}
            user={user}
            signOut={signOut}
          />

          {/* shof if user is NOT loged in and when showlogin === true and showRegister !true */}
          {!this.state.user &&
          (this.state.showLoggedIn && !this.state.showRegister) && (
            <LoginForm
              email={this.state.email}
              password={this.state.password}
              signIn={this.signIn}
              onChange={this.onChange}
              error={this.state.error.message}
              signInWithGoogle={this.signInWithGoogle}
            />
          )}
          {/* show if user is NOT loged in and when showlogedin not is !true but showregister === true */}
          {!this.state.user &&
          (!this.state.showLoggedIn && this.state.showRegister) && (
            <RegisterForm
              email={email}
              password={password}
              createUser={createUser}
              onChange={onChange}
              error={this.state.error.message}
              displayName={displayName}
              signInWithGoogle={signInWithGoogle}
            />
          )}
          {!this.state.user &&
          (!this.state.showLoggedIn && !this.state.showRegister) && (
            <p className="heading">
              {" "}
              Bookmark <span className="bigletter">&</span> share your favorite
              websites with other developers, designers and creatives.{" "}
            </p>
          )}
          {this.state.user && (
            <div className="center-content">
              <p className="heading">
                {/* if not user.display is updated write state displayname which holds info what user wrote */}
                Welcome{" "}
                {this.state.user.displayName ? (
                  this.state.user.displayName
                ) : (
                  displayName
                )}!
              </p>

              <p className="subheading">
                This is your personal page where you can take part of peoples favorite websites within development and other creative areas. < br/>
                You can also add websites that you find inspiring to share with others. Create your own collection of websites by clickling <i className="fa fa-heart" aria-hidden="true" /> and save a bookmark to those websites you find useful.
              </p>
            </div>
          )}
          <div className="box" />
        </div>

        {this.state.user && (
          <nav
            className="navbar navbar-expand-sm navbar-light bg-faded"
            id="logedinnav"
          >
            <button
              className="navbar-toggler navbar-toggler-right"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>

            <a className="navbar-brand" href="">
              {" "}
              <img style={{ height: "50px" }} src={logo} />{" "}
            </a>

            <div className="collapse navbar-collapse" id="nav-content">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <SearchField
                    name="searchTerm"
                    value={searchTerm}
                    onChange={onChange}
                  />
                </li>

                <li className="nav-item">
                  <SelectField onChange={filterByCategory} value={category} />
                </li>

                <li className="nav-item">
                  <button
                    className="btn btn-primary my-2 my-sm-0"
                    type="submit"
                    onClick={toggleShowSavedPosts}
                  >
                    My saved posts{" "}
                    <i className="fa fa-heart" aria-hidden="true" />
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-primary my-2 my-sm-0"
                    type="submit"
                    onClick={toggleShowWritePost}
                  >
                    Write Post{" "}
                    <i className="fa fa-pencil-square-o" aria-hidden="true" />
                  </button>
                </li>
              </ul>
            </div>
          </nav>
        )}

        {this.state.user &&
        this.state.showWritePost && <CreatePost uid={this.state.uid} />}
        {this.state.user &&
        !this.state.showSavedPosts && (
          <ListPosts
            allPosts={allPosts}
            data={postsToRender}
            savePost={savePost}
            onChange={onChange}
            removePost={removePost}
            user={user}
            uid={this.state.user.uid}
          />
        )}
        {this.state.user &&
        this.state.showSavedPosts && (
          <ListSavedPosts userSavedPosts={userSavedPosts} />
        )}
      </div>
    );
  }
}

export default App;
