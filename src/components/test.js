import React from "react";

const ListPosts = props => {
  console.log(props);

  console.log(props.allPosts[1]);

  console.log(props.data);

  const list = props.data.map((item, index) => {
    console.log(item.value);


    //destructure to make things clearer in return
    const description = item.value[2].value;
    const category  = item.value[0].value; 
    const title = item.value[3].value;
    const url = item.value[4].value;

    
    return (
      <li key={item.key}>
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 logo">
            <i className="fa fa-sitemap" aria-hidden="true" />
          </div>
          <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 website">
            <h3>{item.value[3].value}</h3>
            <div className="card-block">
              <p className="card-text"> {description} </p>
            </div>
            <button className="btn btn-primary" value={item.key} onClick={() => props.savePost(item)}>
              {" "}
              <i className="fa fa-heart" aria-hidden="true" />{" "}
            </button>
            <a href={url}>
              {" "}
              <button className="btn btn-primary"> Go to website </button>{" "}
            </a>
            <div className="categoryfield">
              {" "}
              <p> {category} </p>
            </div>
          </div>
        </div>
      </li>
    );
  });

  return (
    <div className="listpostholder">
      <ul id="ullist">{list}</ul>
    </div>
  );
};


// recursive function that checks if firebase object = object if not pushes itself back into function
//in app.js

function toArray(firebaseObject) {
    if (typeof firebaseObject !== "object") {
      return firebaseObject;
    }
    let array = [];
    for (let item in firebaseObject) {
      array.push({
        key: item,
        value: toArray(firebaseObject[item])
      });
    }
    return array;
  }
  
  export default App;

export default ListPosts;
