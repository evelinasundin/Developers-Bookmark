import React, { Component } from "react";
import firebase from "../Firebase";


const SearchField = props => {

    return (
    <div>
       <input
            className="form-control m-3"
            placeholder="Search..."
            type="text"
            name={props.name}
            onChange={props.onChange}
            value={props.value}
          /> 
        </div>
    );
}

export default SearchField;
