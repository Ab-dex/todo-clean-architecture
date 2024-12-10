"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Box, Button, Stack, Typography } from "@mui/material";
import InputBox from "./_components/InputBox";
import SingleTodo from "./_components/SingleTodo";
import { cn } from "@/src/utils/cn";
import { ITodo } from "@/src/domain/models/todos";
import {
  createTodos,
  getTodos,
  removeMultipleTodos,
  removeTodo,
  updateTodo,
} from "./_actions/todoAction";
import { useAppContext } from "./_contexts/AppContext";
import { ModalType, Types } from "./_contexts/context.types";

export default function Todos() {
  const { dispatch } = useAppContext();
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [inputText, setInputText] = useState("");
  const [isTodoCompleted, setTodoCompleted] = useState(false);
  const [todoState, setTodoState] = useState<"all" | "active" | "completed">(
    "all"
  );
  const [animationParent] = useAutoAnimate();

  // Fetch todos from the server
  const fetchTodos = useCallback(async () => {
    try {
      const fetchedTodos = await getTodos();
      setTodos(
        fetchedTodos.sort((a, b) =>
          a.completed === b.completed ? 0 : a.completed ? 1 : -1
        )
      );
    } catch (err) {
      alert("Failed to fetch todos. Please try again.");
    }
  }, []);

  // Handle form submission to add a new todo
  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (inputText.trim() === "") {
        alert("Todo cannot be empty.");
        return;
      }

      const isExistingTodo = todos.some((todo) => todo.todo === inputText);
      if (isExistingTodo) {
        alert("This todo already exists.");
        setInputText("");
        return;
      }

      try {
        await createTodos({ todo: inputText, completed: isTodoCompleted });
        fetchTodos(); // Refresh todos
        setInputText("");
        setTodoCompleted(false);
      } catch (err) {
        alert("Failed to create todo. Please try again.");
      }
    },
    [inputText, isTodoCompleted, todos, fetchTodos]
  );

  // Handle todo completion toggle
  const toggleTodoCompletion = useCallback(
    async (todo: ITodo) => {
      try {
        await updateTodo(todo.id, { completed: !todo.completed });
        fetchTodos(); // Refresh todos
      } catch (err) {
        alert("Failed to update todo. Please try again.");
      }
    },
    [fetchTodos]
  );

  // Handle todo deletion
  const handleDeleteTodo = useCallback(
    async (id: string) => {
      try {
        await removeTodo(id);
        fetchTodos(); // Refresh todos
      } catch (err) {
        alert("Failed to delete todo. Please try again.");
      }
    },
    [fetchTodos]
  );

  // Clear all completed todos
  const clearCompletedTodos = useCallback(async () => {
    const completedIds = todos.filter((todo) => todo.completed).map((todo) => todo.id);
    if (completedIds.length > 0) {
      try {
        await removeMultipleTodos(completedIds);
        fetchTodos(); // Refresh todos
      } catch (err) {
        alert("Failed to clear completed todos. Please try again.");
      }
    }
  }, [todos, fetchTodos]);

  // Show edit modal
  const editTodo = useCallback(
    (id: string) => {
      const todoToEdit = todos.find((todo) => todo.id === id);
      if (todoToEdit) {
        dispatch({
          type: Types.SHOW_MODAL,
          payload: { modalType: ModalType.EDIT_TODO, modalData: todoToEdit },
        });
      }
    },
    [todos, dispatch]
  );

  const filteredTodos = useCallback(() => {
    if (todoState === "active") return todos.filter((todo) => !todo.completed);
    if (todoState === "completed") return todos.filter((todo) => todo.completed);
    return todos;
  }, [todos, todoState]);

  const groupTodosByDate = (todos: ITodo[]) => {
    const todosWithDate = todos.filter((todo) => todo.dueDate);
    const todosWithoutDate = todos.filter((todo) => !todo.dueDate);
  
    const grouped = todosWithDate.reduce((acc, todo) => {
      const dueDate = new Date(todo.dueDate!);
      const formattedDate = dueDate.toLocaleDateString("en-US", {
        weekday: "short",
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
  
      if (!acc[formattedDate]) acc[formattedDate] = [];
      acc[formattedDate].push(todo);
      return acc;
    }, {} as Record<string, ITodo[]>);
  
    // Sort the grouped dates
    const sortedGrouped = Object.keys(grouped)
      .sort((a, b) => {
        const dateA = new Date(a);
        const dateB = new Date(b);
        return dateA.getTime() - dateB.getTime();
      })
      .reduce((acc, date) => {
        acc[date] = grouped[date];
        return acc;
      }, {} as Record<string, ITodo[]>);
  
    return { grouped: sortedGrouped, todosWithoutDate };
  };
  
  const { grouped, todosWithoutDate } = groupTodosByDate(filteredTodos());


    // Effect to fetch todos on mount
    useEffect(() => {
      fetchTodos();
    }, [fetchTodos]);

  return (
    <Stack direction="column" spacing={4} width="100%">
      <InputBox
        isCheckBoxDisabled={inputText.length === 0}
        isTodoCompleted={isTodoCompleted}
        setTodoCompleted={setTodoCompleted}
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        onSubmit={handleSubmit}
        text="Add"
      />
      <Box ref={animationParent} className="bg-slate-800 w-full rounded-md border border-slate-900">
        {Object.entries(grouped).map(([date, todos]) => (
          <div key={date}>
            <div className="flex items-center justify-between px-4 mt-4">
            <Typography variant="h6" fontSize="14px" color="white">
              {date}
            </Typography>
            {
              new Date(date) < new Date() && (
                (
                  <Typography color="red" fontSize="12px">
                    Overdue
                 </Typography>
                )
              )
            }
            </div>
            {todos.map((todo) => (
              <SingleTodo
                key={todo.id}
                editTodo={editTodo}
                activeTodo={todo}
                handleIsTodoCompleted={toggleTodoCompletion}
                deleteTodo={handleDeleteTodo}
                isCompleted={todo.completed}
                text={todo.todo}
              />
            ))}
          </div>
        ))}
        {
          Object.keys(grouped).length > 0 && (
            <Typography variant="h6" paddingInline="1rem" fontSize="12px" color="white" mt={2}>
            Others
          </Typography>
          )
        }
        {todosWithoutDate.map((todo) => (
          <SingleTodo
            key={todo.id}
            editTodo={editTodo}
            activeTodo={todo}
            handleIsTodoCompleted={toggleTodoCompletion}
            deleteTodo={handleDeleteTodo}
            isCompleted={todo.completed}
            text={todo.todo}
          />
        ))}
        <div className="flex justify-between flex-wrap items-center px-5 h-fit gap-y-5 py-3 text-sm text-gray-400">
          <p>{todos.filter((todo) => !todo.completed).length} items left</p>
          <div className="flex gap-3 font-bold">
            {["all", "active", "completed"].map((state) => (
              <button
                key={state}
                onClick={() => setTodoState(state as typeof todoState)}
                className={cn({ "text-blue-500 text-sm md:text-base": todoState === state })}
              >
                {state.charAt(0).toUpperCase() + state.slice(1)}
              </button>
            ))}
          </div>
          <Button onClick={clearCompletedTodos} variant="contained" size="small" sx={{ textTransform: "none" }}>Clear Completed</Button>
        </div>
      </Box>
    </Stack>
  );
}
