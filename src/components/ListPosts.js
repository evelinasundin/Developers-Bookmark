import React from "react";

const ListPosts = props => {
  console.log(props);

  const list = props.allPosts.map((item, index) => {
    console.log(item.value.title);

    // <h1 key={index}> {item.value.title} </h1>

    return <li key={item.key}>
      {/* <p>{item.value.title}</p>
               <p>{item.value.description}</p>
               <a href={item.value.url}>{item.value.url}</a>
               <p>{item.value.category}</p> */}
      <div className="card">
        <h3 className="card-hader">{item.value.title}</h3>
        <div className="card-block">
          <h4 className="card-title" a href={item.value.url}>
            {" "}
            {item.value.url}{" "}
          </h4>
          <p className="card-text"> {item.value.description} </p>
          <p className="card-text"> {item.value.category} </p>
        </div>
      </div>
    </li>;

    //VARFÖR FUNKAR INTE DETTA???

    //  <div className="card" key={item.key}>
    // <h3 className="card-hader">{item.value.title}</h3>
    // <div className="card-block">
    // <h4 className="card-title" a href={item.value.url}> {item.value.url} </h4>
    // <p className="card-text"> {item.value.description} </p>
    // <p className="card-text"> {item.value.category} </p>
    // </div>
    // </div>
  });

  return (
    <div className="harskadomkommaut">
      <ul>{list}</ul>
    </div>
  );
};

export default ListPosts;
