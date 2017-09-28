import React, { Component } from "react";
import firebase from "../Firebase";

const db = firebase.database();

class CreatePost extends Component {
  state = {
    allPosts: [],
    titleValue: "",
    urlValue: "",
    descriptionValue: "",
    categoryValue: "Typography"
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

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div style={{ maxWidth: "50%", margin: "5rem auto" }}>
        <form onSubmit={this.addPost}>
          <div className="form-group">
            <label htmlFor="titleValue"> Title: </label>
            <input
              type="text"
              name="titleValue"
              className="form-control"
              placeholder="Title"
              value={this.state.titleValue}
              onChange={this.onChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="urlValue"> Website: </label>
            <input
              type="text"
              name="urlValue"
              className="form-control"
              placeholder="https://example.com"
              value={this.state.urlValue}
              onChange={this.onChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="descriptionValue"> Description: </label>
            <textarea
              name="descriptionValue"
              className="form-control"
              rows="3"
              placeholder="Description of website"
              value={this.state.descriptionValue}
              onChange={this.onChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="categoryValue"> Category: </label>
            <select
              name="categoryValue"
              className="form-control"
              rows="3"
              placeholder="Choose Category"
              value={this.state.categoryValue}
              onChange={this.onChange}
              required
            >
              <option value="Typography">Typography</option>
              <option value="Websites">Beautiful Websites</option>
              <option value="Graphicdesign">Graphic Design</option>
              <option value="Javascript">Javascript</option>
              <option value="Html">HTML</option>
              <option value="CSS">CSS</option>
              <option value="Photoshop">Photoshop</option>
              <option value="Illustrator">Illustrator</option>
              <option value="Indesign">InDesign</option>
              <option value="Aftereffects">After Effects</option>
              <option value="Premierepro">Premier Pro</option>
              <option value="API">API</option>
            </select>
          </div>
          <input
            type="submit"
            value="Add Post"
            className="btn btn-primary m-3"
          />
        </form>
      </div>
    );
  }
}

export default CreatePost;
