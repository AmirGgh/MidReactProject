import { useState, useEffect, useMemo } from "react";
import axios from "axios";

import Users from "./src/components/Users/Users";
import Search from "./src/components/Search/Search";
import TodoPost from "./src/components/TodosPosts/TodoPost";
import AddUser from "./src/components/Add/AddUser/AddUser";
import "./App.css";
const usersUrl = "https://jsonplaceholder.typicode.com/users";
const todosUrl = "https://jsonplaceholder.typicode.com/todos";
const postsUrl = "https://jsonplaceholder.typicode.com/posts";

function App() {
  const [users, setUsers] = useState([]);
  const [todos, setTodos] = useState([]);
  const [posts, setPosts] = useState([]);
  const [searchUser, setSearchUser] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(-1);
  const [addNewUser, setAddNewUser] = useState(false);
  // First Data structur
  useEffect(() => {
    const fetchData = async () => {
      const { data: usersData } = await axios.get(usersUrl);
      const { data: todosData } = await axios.get(todosUrl);
      const { data: postsData } = await axios.get(postsUrl);
      setUsers(usersData);
      setTodos(todosData);
      setPosts(postsData);
    };
    fetchData();
  }, []);
  //Utils
  const isEmpty = (str) => str === "";
  //Serch Bar
  const search = (s) => {
    setSearchUser(s);
  };
  const userSearch = useMemo(() => {
    return users.filter((user) => {
      const usersByName = user.name.includes(searchUser);
      const usersByEmail = user.email.includes(searchUser);
      return usersByName || usersByEmail || "";
    });
  }, [users, searchUser]);

  const newCurrentUser = (curUser) => {
    setCurrentUserId(curUser);
  };

  //User Update
  const updateUser = (name, email, id, street, city, zipcode) => {
    if (!isEmpty(name)) users[id].name = name;
    if (!isEmpty(email)) users[id].email = email;
    if (!isEmpty(street)) users[id].address.street = street;
    if (!isEmpty(city)) users[id].address.city = city;
    if (!isEmpty(zipcode)) users[id].address.zipcode = zipcode;
  };

  const deleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
    setCurrentUserId(-1);
  };
  //Add User
  const addUserBtn = () => {
    setAddNewUser(!addNewUser);
  };

  const addUser = (newName, newEmail) => {
    if (!isEmpty(newName) && !isEmpty(newEmail)) {
      const newUser = {
        id: users.length + 1,
        name: newName,
        email: newEmail,
      };
      setUsers([...users, newUser]);
    }
  };

  //Add Todo & Post
  const addTodo = (newTitle, id) => {
    if (!isEmpty(newTitle)) {
      const newTodo = {
        userId: id,
        id: todos.length,
        title: newTitle,
        completed: false,
      };
      setTodos([...todos, newTodo]);
    }
  };
  const addPost = (newTitle, body, id) => {
    if (!isEmpty(newTitle) && !isEmpty(body)) {
      const newPost = {
        userId: id,
        id: posts.length,
        title: newTitle,
        body: body,
      };

      setPosts([...posts, newPost]);
    }
  };

  return (
    <div>
      <div className='column' style={{ float: "left" }}>
        <Search users={users} callback={search} addUserBtn={addUserBtn} />
        <Users
          users={userSearch}
          todos={todos}
          updateUser={updateUser}
          deleteUser={deleteUser}
          currentUserId={newCurrentUser}
        />
      </div>
      <div
        style={{
          margin: "20px",
          padding: "2px",
          width: "640px",
          float: "left",
        }}
      >
        {currentUserId !== -1 && !addNewUser && (
          <TodoPost
            userId={currentUserId}
            todos={todos.filter((todo) => {
              return todo.userId === currentUserId;
            })}
            posts={posts.filter((post) => post.userId === currentUserId)}
            id={currentUserId}
            addTodo={addTodo}
            addPost={addPost}
          />
        )}
        {addNewUser && <AddUser addUserBtn={addUserBtn} addUser={addUser} />}
      </div>
    </div>
  );
}

export default App;
