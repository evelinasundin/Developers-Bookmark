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
    displayName: "",
    allUsers: [],
    userSavedPosts: [],
    error: {
      message: ""
    },
    showWritePost: false
  };

  componentDidMount() {
    db.ref("allPosts").on("value", snapshot => {
      const posts = toArray(snapshot.val());
      this.setState({ allPosts: posts });
      console.log(this.state.allPosts);
    });

    // db.ref(`users/${this.state.user.uid.userSavedPosts}`).on("value", snapshot => {
    //    const getSavedPosts = toArray(snapshot.val());
    //    this.setState({ userSavedPosts: getSavedPosts });
    //   console.log(this.state.userSavedPosts);
    // });

    db.ref("users").on("value", snapshot => {
      const getUsers = toArray(snapshot.val());
      this.setState({ allUsers: getUsers });
      console.log(this.state.allUsers);
    });

    at.onAuthStateChanged(user => {
      if (user) {
        this.setState({ user: user, uid: user.uid });
        console.log(user);
        //kollar så usersavedposts hålls uppdaterat
        firebase
          .database()
          .ref(`users/${user.uid}/userSavedPosts`)
          .on("value", snapshot => {}
          );
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

  toggleShowWritePost = () => {
    this.setState({
      showWritePost: !this.state.showWritePost
    })
  }

  // addPost = () => {
  //   const post = {
  //     title: this.state.titleValue,
  //     description: this.state.descriptionValue,
  //     date: new Date().toLocaleString(),
  //     url: this.state.urlValue,
  //     category: this.state.categoryValue,
  //     userID: this.props.uid
  //   };

  //   db.ref("allPosts").push(post);
  // };

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

  signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then((result)=> {
    const user = result.user;
    firebase.database().ref(`users/${user.uid}`).set({ email: user.email, uid: user.uid})
    }).catch(error => {
      this.setState({hasError: true})
      this.setState({error: error.message})
      console.log(error)
    })
  }

  //gets chosen post from onClick function on Save Button in ListPosts
  savePost = chosenPost => {
    console.log(chosenPost);

    //gets current user and pushes chosenPost into new array calles usersSavedPosts which is created here
    db.ref(`users/${this.state.user.uid}/userSavedPosts`).push(chosenPost);
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
    // console.log(this.state.allPosts);

    console.log(this.state.allUsers);

    const {
      category,
      postsByCategory,
      allPosts,
      searchTerm,
      allUsers,
      uid
    } = this.state;

    let postsToRender = category ? postsByCategory : allPosts;

    postsToRender = searchTerm
      ? postsToRender.filter(post =>
          post.value.description
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        )
      : postsToRender;

    console.log(postsToRender);

    // const posts = this.state.allUsers.map(user=>{

    //   return user.value.userSavedPosts;
    // })
    //  console.log(posts)

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
              email={this.state.email}
              password={this.state.password}
              signIn={this.signIn}
              onChange={this.onChange}
              error={this.state.error.message}
              signInWithGoogle={this.signInWithGoogle}
            />
          )}
          {/* visa om inte usern är inloggad och när showLoggedIn inte är true men showRegister är true */}
          {!this.state.user &&
          (!this.state.showLoggedIn && this.state.showRegister) && (
            <RegisterForm
              email={this.state.email}
              password={this.state.password}
              createUser={this.createUser}
              onChange={this.onChange}
              error={this.state.error.message}
              displayName={this.state.displayName}
              signInWithGoogle={this.signInWithGoogle}
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
            <div className="center-content">
              <p className="heading">
                {/* if not user.display is updated write state displayname which holds info what user wrote */}
                Welcome{" "}
                {this.state.user.displayName ? (
                  this.state.user.displayName
                ) : (
                  this.state.displayName
                )}!
              </p>
            </div>
          )}
          <div className="box" />
        </div>

        {this.state.user && (
          <nav className="navbar navbar-expand-sm navbar-light bg-faded">
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

            <p className="navbar-brand db"> Developers Bookmark </p>

            <div className="collapse navbar-collapse" id="nav-content">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <SearchField
                    name="searchTerm"
                    value={this.state.searchTerm}
                    onChange={this.onChange}
                    renderSearchPosts={this.renderSearchPosts}
                  />
                </li>

                <li className="nav-item">
                  <SelectField
                    onChange={this.filterByCategory}
                    value={category}
                  />
                </li>

                <li className="nav-item">
                  <button
                    className="btn btn-primary my-2 my-sm-0"
                    type="submit"
                  >
                    My saved posts{" "}
                    <i className="fa fa-heart" aria-hidden="true" />
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-primary my-2 my-sm-0"
                    type="submit"
                    onClick={this.toggleShowWritePost}
                  >
                    Write Post{" "}
                    <i className="fa fa-pencil-square-o" aria-hidden="true" />
                  </button>
                </li>
              </ul>
            </div>
          </nav>
        )}

        {this.state.user && (this.state.showWritePost) && <CreatePost uid={this.state.uid} />}
        {this.state.user && (
          <ListPosts
            allPosts={this.state.allPosts}
            data={postsToRender}
            savePost={this.savePost}
            onChange={this.onChange}
          />
        )}
        {this.state.user && (
          <ListSavedPosts allUsers={this.state.allUsers} uid={uid} />
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
