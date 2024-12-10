"use client";

import React, { useEffect, useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Box, Stack } from "@mui/material";
import InputBox from "./_components/InputBox";
import SingleTodo from "./_components/SingleTodo";
import { cn } from "@/src/utils/cn";
import { ITodo } from "@/src/domain/models/todos";
import { createTodos, getTodos, removeMultipleTodos, removeTodo, updateTodo } from "./_actions/todoAction";
import { useAppContext } from "./_contexts/AppContext";
import { ModalType, Types } from "./_contexts/context.types";

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
  const { dispatch } = useAppContext();
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [inputText, setInputText] = useState("");
  const [isTodoCompleted, setTodoCompleted] = useState(false);
  const [todoState, setTodoState] = useState<"all" | "active" | "completed">(
    "all"
  );
  const [animationParent] = useAutoAnimate();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  
    if (inputText.trim() === "") {
      alert("Todo cannot be empty.");
      return;
    }
  
    // Check for duplicate todos
    const isExistingTodo = todos.some((todo) => todo.todo === inputText);
    if (isExistingTodo) {
      alert("This todo already exists");
      setInputText("");
      setTodoCompleted(false);
      return;
    }
  
    try {
      // Create a new todo using the server action
      await createTodos({ todo: inputText, completed: isTodoCompleted });
  
      // Refetch todos to get the updated list
      const updatedTodos = fetchTodo();
  
      // Reset the input field and state
      setInputText("");
    } catch (err: unknown) {
      alert("Failed to create todo: " + err);
    }
  }
  

  async function deleteTodo(id: string) {
    await removeTodo(id)
    fetchTodo()
  }

  function editTodo(id: string) {

    const todoToEdit = todos.find((todo) => todo.id == id);
    if (todoToEdit) {
      dispatch({
        type: Types.SHOW_MODAL,
        payload: { modalType: ModalType.EDIT_TODO, modalData: todoToEdit },
      });
    }
  }

  async function handleIsTodoCompleted(todo: ITodo) {
    const {id, completed} = todo
    await updateTodo(id, {completed: !completed})
    fetchTodo()
  }

  async function clearCompleteTodos() {
    const completed = todos.filter(todo => !!todo.completed)?.map(todo => todo.id)
    await removeMultipleTodos(completed)
    fetchTodo()
  }

  const completedTodos = todos.filter((d) => d.completed);
  const activeTodos = todos.filter((d) => !d.completed);

  const fetchTodo = async () => {
    let todos: ITodo[];
    try {
      todos = await getTodos();
      setTodos(todos?.sort((a, b) => (a.completed === b.completed ? 0 : a.completed ? 1 : -1)));
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
                  editTodo={editTodo}
                  activeTodo={todo}
                  handleIsTodoCompleted={handleIsTodoCompleted}
                  deleteTodo={(id) => deleteTodo(id)}
                  isCompleted={todo.completed}
                  text={todo.todo}
                />
          ))}
        {todoState === "active" &&
          activeTodos.map((todo: ITodo, index) => (
            <SingleTodo
                  key={index}
                  editTodo={editTodo}
                  activeTodo={todo}
                  handleIsTodoCompleted={handleIsTodoCompleted}
                  deleteTodo={deleteTodo}
                  isCompleted={todo.completed}
                  text={todo.todo}
                />
          ))}
        {todoState === "completed" &&
          completedTodos.map((todo, index) => (
            <SingleTodo
                  key={index}
                  editTodo={editTodo}
                  activeTodo={todo}
                  handleIsTodoCompleted={handleIsTodoCompleted}
                  deleteTodo={deleteTodo}
                  isCompleted={todo.completed}
                  text={todo.todo}
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
