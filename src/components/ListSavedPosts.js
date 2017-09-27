import React from "react";

const ListSavedPosts = props => {
    console.log(props);
    console.log("ALL SAVED", props.allUsers);
    console.log("EVVE SAVED", props.userSavedPosts);

    const savedposts = props.userSavedPosts.map((item, index) => {
        console.log(item);
        console.log(item.value.title);
        return item.value
        console.log(item.value.title);
        // <p> (item.value.title) </p>
    }).map((item => {
        for(let key in item){
            console.log(item[key]);
            return <li key={item.key}>
            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 logo">
                <i className="fa fa-sitemap" aria-hidden="true" />
              </div>
              <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 website">
                <h3>{item.value.title}</h3>
                <div className="card-block">
                  <p className="card-text"> {item.value.description} </p>
                </div>
            
                <a href={item.value.url}>
                  {" "}
                  <button className="btn btn-primary"> Go to website </button>{" "}
                </a>
                <div className="categoryfield">
                  {" "}
                  <p> {item.value.category} </p>
                </div>
              </div>
            </div>
          </li>
             
        }
    }))

    // const posts = props.allUsers.map((item, index) => {
    //     console.log(item);
    //     if(props.uid === item.key && item.value.userSavedPosts) {
    //     return item.value.userSavedPosts
    //     }
    //     }).map((item => {
    //     for(let key in item){
    //         console.log(item[key])
    //         return item[key];
    //     }
    // })).map((item, index) => {
    //     console.log(item.value.title);
    //     return <li key={item.key}>
    //     <div className="row">
    //       <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 logo">
    //         <i className="fa fa-sitemap" aria-hidden="true" />
    //       </div>
    //       <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 website">
    //         <h3>{item.value.title}</h3>
    //         <div className="card-block">
    //           <p className="card-text"> {item.value.description} </p>
    //         </div>
    //         <a href={item.value.url}>
    //           {" "}
    //           <button className="btn btn-primary"> Go to website </button>{" "}
    //         </a>
    //         {/* {item.value.userID === props.uid && <button onClick={() => props.removePost(item.key)} className="btn btn-danger"> Remove Post </button>} */}
    //         <div className="categoryfield">
    //           {" "}
    //           <p> {item.value.category} </p>
    //         </div>
    //       </div>
    //     </div>
    //   </li>
    // })
      return (
        <div className="harskadomkommaut">
         <ul>{savedposts}</ul>
        </div>
      );
    };

export default ListSavedPosts;
