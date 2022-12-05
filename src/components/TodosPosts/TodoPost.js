import React from "react";
import { useState } from "react";
import AddTodo from "../Add/AddTodos/AddTodos";
import AddPost from "../Add/AddPost/AddPost";
import "./todoPost.css";
const TodoPost = (props) => {
  const [completedBtn, setCompletedBtn] = useState(false);
  const [addTodo, setAddTodo] = useState(false);
  const [addPost, setAddPost] = useState(false);

  const cancelAddTodo = () => {
    setAddTodo(!addTodo);
  };
  const cancelAddPost = () => {
    setAddPost(!addPost);
  };

  //
  return (
    <div>
      <div className='todos'>
        Todos - User {props.id}
        {!addTodo && <button onClick={() => setAddTodo(!addTodo)}>Add</button>}
        <div>
          {addTodo && (
            <AddTodo
              cancelAddTodo={cancelAddTodo}
              addTodo={props.addTodo}
              id={props.id}
            />
          )}
          {!addTodo &&
            props.todos.map((todo) => {
              return (
                <div className='todo' key={todo.id}>
                  Title : {todo.title}
                  <br />
                  Completed : {JSON.stringify(todo.completed)}
                  <br />
                  <input
                    type='button'
                    style={{
                      background: todo.completed ? "#FF7D7D" : "#B3FFAE",
                      padding: "5px",
                    }}
                    onClick={() => {
                      todo.completed = !todo.completed;
                      setCompletedBtn(todo.completed);
                    }}
                    value={
                      todo.completed ? "Mark Uncompleted" : "Mark Completed"
                    }
                  />
                </div>
              );
            })}
        </div>
      </div>

      <div className='posts'>
        Posts - User {props.id}
        {!addPost && <button onClick={() => setAddPost(!addPost)}>Add</button>}
        <div>
          {addPost && (
            <AddPost
              cancelAddPost={cancelAddPost}
              addPost={props.addPost}
              id={props.id}
            />
          )}
          {!addPost &&
            props.posts.map((post) => {
              return (
                <div className='post' key={post.id}>
                  Title : {post.title}
                  <br />
                  Body : {post.body}
                  <br />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default TodoPost;
