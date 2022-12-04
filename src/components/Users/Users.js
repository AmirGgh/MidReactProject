import React from "react";
import User from "../User/User";
import { useState, useEffect } from "react";
const Users = (props) => {
  const [markUser, setMarkUser] = useState(-1);

  const mark = (id) => {
    setMarkUser(id);
  };
  useEffect(() => {}, [markUser]);
  return (
    <div>
      {props.users.map((user) => {
        return (
          <User
            mark={mark}
            isMarked={markUser}
            key={user.id}
            user={user}
            todos={props.todos}
            updateUser={props.updateUser}
            deleteUser={props.deleteUser}
            currentUserId={props.currentUserId}
          />
        );
      })}
    </div>
  );
};

export default Users;
