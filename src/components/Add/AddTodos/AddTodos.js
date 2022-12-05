import React from "react";
import { useState } from "react";
const AddTodo = (props) => {
  const [newTitle, setNewTitle] = useState("");
  return (
    <div style={{ width: "290px", padding: "5px" }}>
      <br />
      Title: <input type='text' onChange={(e) => setNewTitle(e.target.value)} />
      <br />
      <br />
      <button
        onClick={() => {
          setNewTitle("");
          props.cancelAddTodo();
        }}
      >
        Cancel
      </button>
      <button
        onClick={() => {
          props.addTodo(newTitle, props.id);
          props.cancelAddTodo();
        }}
      >
        Add
      </button>
    </div>
  );
};

export default AddTodo;
