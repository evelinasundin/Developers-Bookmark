import React from "react";

const ListPosts = props => {

  const list = props.data.map((item, index) => {
  

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
            <button
              className="btn btn-primary"
              value={item.key}
              onClick={() => props.savePost(item)}
            >
              {" "}
              <i className="fa fa-heart" aria-hidden="true" />{" "}
            </button>
            <a href={item.value.url}>
              {" "}
              <button className="btn btn-primary"> Go to website </button>{" "}
            </a>
            {item.value.userID === props.uid && <button onClick={() => props.removePost(item.key)} className="btn btn-danger"> Remove Post </button>}
            <div className="categoryfield">
              {" "}
              <p className="category"> Category: {item.value.category} </p>
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

export default ListPosts;
