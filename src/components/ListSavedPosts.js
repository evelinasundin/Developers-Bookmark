import React from "react";

const ListSavedPosts = props => {
    // console.log(props);
    // console.log(props.data);
    console.log(props.userSavedPosts);
    // console.log("ALL SAVED", props.allUsers);
    // console.log("EVVE SAVED", props.userSavedPosts);

    // if (props.userSavedPosts = "") {
    //     return <h3> You have not saved any posts yet! </h3>
    // }else {

    const savedposts = props.userSavedPosts.map((item, index) => {
        console.log(item);
        console.log(item.value.title);
        return item.value
        console.log(item.value.title);
    }).map((item => {
        for(let key in item){
            console.log(item[key]);
            return <li key={item.key}>
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
                  <button className="btn btn-primary"> Go to website </button>{" "}
                </a>
                <div className="categoryfield">
                  {" "}
                  <p className="category"> Category: {item.value.category} </p>
                </div>
              </div>
            </div>
          </li>
             
        }
    }))
// }

      return (
        <div className="harskadomkommaut">
            <h3> Here are your saved posts: </h3>
         <ul>{savedposts}</ul>
        </div>
      );
    };

export default ListSavedPosts;
