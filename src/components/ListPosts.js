import React from "react";

const ListPosts = props => {
  console.log(props);

  const list = props.data.map((item, index) => {
    console.log(item.value.title);
    

    return (
      <li key={item.key}>
        <div className="card">
          <h3 className="card-hader">{item.value.title}</h3>
          <div className="card-block">
            <a href={item.value.url}>
              <h4 className="card-title">{item.value.url}</h4>
            </a>
            <p className="card-text"> {item.value.description} </p>
            <p className="card-text"> {item.value.category} </p>
          </div>
          <button value={item.key} onClick={() => props.savePost(item)}> Save Post </button>
          <button> Go to website </button>
        </div>
      </li>
    );


  });

  return (
    <div className="harskadomkommaut">
      <ul>{list}</ul>
    </div>
  );
};

export default ListPosts;
