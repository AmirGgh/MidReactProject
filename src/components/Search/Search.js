import React from "react";

const Search = (props) => {
  return (
    <div>
      <label>Search </label>
      <input
        type='text'
        onChange={(e) => {
          props.callback(e.target.value);
        }}
      />
      <button onClick={() => props.addUserBtn()}>Add</button>
      <br />
    </div>
  );
};

export default Search;
