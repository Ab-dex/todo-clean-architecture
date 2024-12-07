"use client";

import React, { useEffect, useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Box, Stack } from "@mui/material";
import InputBox from "./_components/InputBox";
import SingleTodo from "./_components/SingleTodo";
import { cn } from "@/src/utils/cn";
import { getTodosController } from "@/src/interface-adapters/controllers/todos.controller";
import { Todo } from "@/src/domain/models/todos";
import { getTodos } from "./actions";

export type TodoType = {
  id: number;
  text: string;
  isCompleted: boolean;
};

const sampleTodos: TodoType[] = [
  { id: 1, text: "hello", isCompleted: false },
  { id: 2, text: "todo 2", isCompleted: true },
  { id: 3, text: "how r u  3", isCompleted: false },
];

export default function Todos() {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [inputText, setInputText] = useState("");
  const [isTodoCompleted, setTodoCompleted] = useState(false);
  const [editModeId, setEditModeId] = useState<number | null>(null);
  const [textValue, setTextValue] = useState("");
  const [todoState, setTodoState] = useState<"all" | "active" | "completed">(
    "all"
  );
  const [animationParent] = useAutoAnimate();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (inputText.trim() !== "") {
      const isExistingTodo = todos.some((todo) => todo.text === inputText);
      if (isExistingTodo) {
        alert("This todo already exists");
        setInputText("");
        setTodoCompleted(false);
        return;
      }
      setTodos([
        ...todos,
        // no need declaring variable for this
        { id: todos.length + 1, text: inputText, isCompleted: isTodoCompleted },
      ]);
      setInputText("");
    }
  }

  function deleteTodo(id: number) {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }

  function editTodo(id: number) {
    setEditModeId(id);

    const todoToEdit = todos.find((todo) => todo.id == id);
    if (todoToEdit) {
      setTextValue(todoToEdit.text);
    }
  }

  function saveEditTodo() {
    const updatedTodos = todos.map((todo) =>
      todo.id === editModeId ? { ...todo, text: textValue } : todo
    );
    setTodos(updatedTodos);
    setEditModeId(null);
  }

  function handleIsTodoCompleted(todo: TodoType) {
    const updatedTodos: TodoType[] = todos.map((d) => {
      if (todo == d) {
        return { ...d, isCompleted: !d.isCompleted };
      }
      return d;
    });

    setTodos(updatedTodos);
  }

  function clearCompleteTodos() {
    const updatedTodos = todos.filter((todo) => !todo.isCompleted);

    setTodos(updatedTodos);
  }

  const completedTodos = todos.filter((d) => d.isCompleted);
  const activeTodos = todos.filter((d) => !d.isCompleted);

  const fetchTodo = async () => {
    let todos: Todo[];
    try {
      todos = await getTodos();
      console.log(todos)
    } catch (err) {
      throw err;
    }
  }

  useEffect(() => {
    fetchTodo()
  }, [])



  return (
    <Stack direction="column" useFlexGap spacing={{ xs: 2, sm: 4 }} width={"100%"}>
      <InputBox
        isCheckBoxDisabled={inputText.length === 0}
        isTodoCompleted={isTodoCompleted}
        setTodoCompleted={setTodoCompleted}
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        onSubmit={handleSubmit}
        text="Add"
      />
      <Box
        ref={animationParent}
        
        className="bg-slate-800 w-full rounded-md border border-slate-900"
      >
        {todoState === "all" &&
          todos.map((todo, index) => (
            <SingleTodo
                  key={index}
                  setTextValue={setTextValue}
                  editModeId={editModeId}
                  textValue={textValue}
                  saveEditTodo={saveEditTodo}
                  editTodo={editTodo}
                  d={todo}
                  handleIsTodoCompleted={() => handleIsTodoCompleted(todo)}
                  deleteTodo={() => deleteTodo(todo.id)}
                  isCompleted={todo.isCompleted}
                  text={todo.text}
                />
          ))}
        {todoState === "active" &&
          activeTodos.map((todo, index) => (
            <SingleTodo
                  key={index}
                  setTextValue={setTextValue}
                  editModeId={editModeId}
                  textValue={textValue}
                  saveEditTodo={saveEditTodo}
                  editTodo={editTodo}
                  d={todo}
                  handleIsTodoCompleted={() => handleIsTodoCompleted(todo)}
                  deleteTodo={() => deleteTodo(todo.id)}
                  isCompleted={todo.isCompleted}
                  text={todo.text}
                />
          ))}
        {todoState === "completed" &&
          completedTodos.map((todo, index) => (
            <SingleTodo
                  key={index}
                  setTextValue={setTextValue}
                  editModeId={editModeId}
                  textValue={textValue}
                  saveEditTodo={saveEditTodo}
                  editTodo={editTodo}
                  d={todo}
                  handleIsTodoCompleted={() => handleIsTodoCompleted(todo)}
                  deleteTodo={() => deleteTodo(todo.id)}
                  isCompleted={todo.isCompleted}
                  text={todo.text}
                />
          ))}
          {/*  filter  */}
          <div
              className="flex justify-between items-center gap-2 px-5 h-[45px] text-sm
            text-gray-400
            "
            >
              <p>{activeTodos.length} items left </p>
              <div className="flex font-bold  gap-3">
                <button
                  onClick={() => setTodoState("all")}
                  className={cn({ "text-blue-500": todoState === "all" })}
                >
                  All
                </button>
                <button
                  onClick={() => setTodoState("active")}
                  className={cn({ "text-blue-500": todoState === "active" })}
                >
                  Active
                </button>
                <button
                  onClick={() => setTodoState("completed")}
                  className={cn({ "text-blue-500": todoState === "completed" })}
                >
                  Completed
                </button>
              </div>
              <button onClick={clearCompleteTodos}>Clear Completed</button>
            </div>
      </Box>
    </Stack>
  );
}
