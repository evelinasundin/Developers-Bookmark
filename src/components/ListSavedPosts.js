import React from "react";

const ListSavedPosts = props => {
     const savedposts = props.userSavedPosts

      //map through userSavedPosts
      .map((item, index) => {
        return item.value;
        //since userSavedPost is a nested object in users in database we have to map again
      })
      .map(item => {
        for (let key in item) {
          return (
            <li key={item.key}>
              <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 logo">
                  <i className="fa fa-sitemap" aria-hidden="true" />
                </div>
                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 website">
                  <h3 className="title">{item.value.title}</h3>
                  <div className="card-block">
                    <p className="description"> {item.value.description} </p>
                  </div>

                  <a href={item.value.url}>
                    {" "}
                    <button className="btn btn-primary">
                      {" "}
                      Go to website{" "}
                    </button>{" "}
                  </a>
                  <div className="categoryfield">
                    {" "}
                    <p className="category">
                      {" "}
                      Category: {item.value.category}{" "}
                    </p>
                  </div>
                </div>
              </div>
            </li>
          );
        }
      });

  return (
    <div>
      <h3 className="savedposttitle"> Here are your saved posts: </h3>
      <ul>{savedposts}</ul>
    </div>
  );
};

export default ListSavedPosts;
