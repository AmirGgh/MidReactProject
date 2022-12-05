import React from "react";
import { useState } from "react";
import OtherData from "../OtherData/OtherData";
import "./user.css";

const User = (props) => {
  const [updatName, setUpdatName] = useState("");
  const [updatEmail, setUpdatEmail] = useState("");
  const [updatStr, setUpdatStr] = useState("");
  const [updatCity, setUpdatCity] = useState("");
  const [updatZipcode, setUpdatZipcode] = useState("");

  const isAllDone = (id) => {
    return props.todos
      .filter((todos) => todos.userId === id)
      .every((todo) => todo.completed);
  };

  const handleStr = (street) => {
    setUpdatStr(street);
  };
  const handleCity = (city) => {
    setUpdatCity(city);
  };
  const handleZipcode = (zipcode) => {
    setUpdatZipcode(zipcode);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    props.updateUser(
      updatName,
      updatEmail,
      props.user.id,
      updatStr,
      updatCity,
      updatZipcode
    );
  };

  return (
    <div
      className='container'
      style={{
        background: props.isMarked === props.user.id ? "#FFD372" : "#FFF",
        border: isAllDone(props.user.id)
          ? "lightgreen 5px solid"
          : "red 2px solid",
      }}
    >
      <label
        onClick={() => {
          props.currentUserId(props.user.id);
          props.mark(props.user.id);
        }}
      >
        ID:{" "}
      </label>{" "}
      {props.user.id}
      <br />
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>Name: </label>{" "}
        <input
          type='text'
          defaultValue={props.user.name}
          onChange={(e) => setUpdatName(e.target.value)}
        />
        <br />
        <label>Email: </label>
        <input
          type='email'
          defaultValue={props.user.email}
          onChange={(e) => setUpdatEmail(e.target.value)}
        />
        <br />
        <OtherData
          address={props.user.address}
          handleStr={handleStr}
          handleCity={handleCity}
          handleZipcode={handleZipcode}
        />
        <br />
        <button type='submit'> Update</button>
        <button onClick={() => props.deleteUser(props.user.id)}>Delete</button>
      </form>
      <br />
      <br />
    </div>
  );
};

{
  /* <OtherData address={props.user.address} /> */
}
export default User;
