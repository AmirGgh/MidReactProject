import React from "react";
import { useState } from "react";
const AddUser = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  return (
    <div
      style={{
        margin: "50px",
        padding: "5px",
        width: "350px",
        float: "left",
        border: "2px solid",
      }}
    >
      Add New User
      <div>
        Name: <input type='text' onChange={(e) => setName(e.target.value)} />
        <br />
        Email: <input type='email' onChange={(e) => setEmail(e.target.value)} />
        <br />
        <br />
        <button
          onClick={() => {
            setName("");
            setEmail("");
            props.addUserBtn();
          }}
        >
          Cancel
        </button>
        <button onClick={() => props.addUser(name, email)}>Add</button>
      </div>
    </div>
  );
};

export default AddUser;
