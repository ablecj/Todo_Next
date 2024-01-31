"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface TodoType {
  text: string;
  status: boolean;
  id: number;
}

export default function Home() {
  // state for the todo
  const [todos, setTodos] = useState<TodoType[]>([]);

  // functions for the todos
  const getTodos = () => {
    let tempTodos = localStorage.getItem("todos");
    console.log(tempTodos);
    if (tempTodos == null) {
      setTodos([]);
    } else {
      setTodos(JSON.parse(tempTodos));
    }
  };
  useEffect(() => {
    getTodos();
  }, []);

  const [newTodoText, setNewTodoText] = useState("");
  const addTodo = () => {
    // console.log(newTodoText);
    if (newTodoText.length == 0) {
      return toast.error("Todo Text is required !");
    }

    let localStorageTodos = localStorage.getItem("todos");
    let newTodoObj = {
      text: newTodoText,
      status: false,
      id: new Date().getTime(),
    };

    if (localStorageTodos == null) {
      localStorage.setItem("todos", JSON.stringify([newTodoObj]));
    } else {
      let todos = JSON.parse(localStorageTodos);
      todos.push(newTodoObj);
      localStorage.setItem("todos", JSON.stringify(todos));
    }

    setNewTodoText("");
    getTodos();
    setShowModel(false);
  };

  const updateTodos = (id: number) => {
    let tempTodos = localStorage.getItem("todos");
    if (tempTodos) {
      let jsonParsedTodo = JSON.parse(tempTodos);

      let currentTodo = jsonParsedTodo.find((todo: TodoType) => todo.id === id);

      let index = jsonParsedTodo.indexOf(currentTodo);

      jsonParsedTodo[index].status = !jsonParsedTodo[index].status;

      localStorage.setItem("todos", JSON.stringify(jsonParsedTodo));
    }

    getTodos();
  };

  const deleteTodos = (id: number) => {
    let tempTodos = localStorage.getItem("todos");

    if (tempTodos) {
      let jsonParsedTodo = JSON.parse(tempTodos);

      let currentTodo = jsonParsedTodo.find((todo: TodoType) => todo.id === id);

      let index = jsonParsedTodo.indexOf(currentTodo);

      jsonParsedTodo.splice(index, 1);
      console.log(jsonParsedTodo.splice(index, 1), "splice");
      localStorage.setItem("todos", JSON.stringify(jsonParsedTodo));
    }
    getTodos();
  };

  const [showModel, setShowModel] = useState(false);

  return (
    <div className={styles.outerPage}>
      <div className={styles.todoOut}>
        <div className={styles.section1}>
          <h1>Todo App</h1>
        </div>
        <div className={styles.todos}>
          {todos.length > 0 ? (
            todos.map((todo, index) => {
              return (
                <div key={index} className={styles.todocart}>
                  {
                    todo.status === false ?
                    <h2 className={styles.taskPending}>{todo.text}</h2> :
                    <h2 className={styles.taskDone}>{todo.text}</h2>
                  }
                  <div className={styles.icons}>
                    <svg
                    style={{color:"red"}}
                      onClick={() => {
                        deleteTodos(todo.id);
                      }}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className=" w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
                      />
                    </svg>
                    <svg
                    style={{color:"green"}}
                      onClick={() => {
                        updateTodos(todo.id);
                      }}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                      />
                    </svg>
                  </div>
                </div>
              );
            })
          ) : (
            <div className={styles.noTodos}>
              <h3>No todos yet</h3>
            </div>
          )}
        </div>
        <button
          className={styles.openModelBtn}
          onClick={() => {
            setShowModel(true);
          }}
        >
          +
        </button>
      </div>
      {showModel && (
        <div className={styles.createTodoModal}>
          <div className={styles.createTodoModalIn}>
            <input
              type="text"
              placeholder="Todo Text"
              onChange={(e) => {
                setNewTodoText(e.target.value);
              }}
            />
            <button onClick={() => addTodo()}>+</button>
          </div>
        </div>
      )}
    </div>
  );
}
