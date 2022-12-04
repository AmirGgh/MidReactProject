import React from "react";
import { useState } from "react";
const AddPost = (props) => {
  const [newTitle, setNewTitle] = useState("");
  const [newBody, setNewBody] = useState("");
  return (
    <div style={{ width: "310px", padding: "5px" }}>
      <br />
      Title: <input type='text' onChange={(e) => setNewTitle(e.target.value)} />
      <br />
      <br />
      Body: <input type='text' onChange={(e) => setNewBody(e.target.value)} />
      <br />
      <br />
      <button
        onClick={() => {
          setNewTitle("");
          setNewBody("");
          props.cancelAddPost();
        }}
      >
        Cancel
      </button>
      <button
        onClick={() => {
          props.addPost(newTitle, newBody, props.id);
          props.cancelAddPost();
        }}
      >
        Add
      </button>
    </div>
  );
};

export default AddPost;
