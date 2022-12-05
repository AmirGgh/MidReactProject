import { useState, useEffect, useMemo } from "react";
import axios from "axios";

import Users from "./components/Users/Users";
import Search from "./components/Search/Search";
import TodoPost from "./components/TodosPosts/TodoPost";
import AddUser from "./components/Add/AddUser/AddUser";
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
  const [pastUsers, setPastUsers] = useState(0);
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

  const updateUser = (name, email, id, street, city, zipcode) => {
    const index = users.findIndex((user) => user.id === id);
    if (!isEmpty(name)) users[index].name = name;
    if (!isEmpty(email)) users[index].email = email;
    if (!isEmpty(street)) users[index].address.street = street;
    if (!isEmpty(city)) users[index].address.city = city;
    if (!isEmpty(zipcode)) users[index].address.zipcode = zipcode;
  };

  const deleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
    setTodos(todos.filter((todo) => todo.userId !== id));
    setPosts(posts.filter((post) => post.userId !== id));
    setCurrentUserId(-1);
    setPastUsers(pastUsers + 1);
  };
  //Add User
  const addUserBtn = () => {
    // Display or undisplay addUser component
    setAddNewUser(!addNewUser);
  };

  const addUser = (newName, newEmail) => {
    if (!isEmpty(newName) && !isEmpty(newEmail)) {
      const newUser = {
        id: users.length + 1 + pastUsers,
        name: newName,
        email: newEmail,
        address: {
          street: "",
          city: "",
          zippcode: "",
        },
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
