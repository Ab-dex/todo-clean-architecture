"use client";

import Image from "next/image";

import bgDesktopDark from "@/assets/images/bg-desktop-dark.jpg";
import bgMobiledark from "@/assets/images/bg-mobile-dark.jpg";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useState } from "react";
import InputBox from "./_components/InputBox";
import SingleTodo from "./_components/SingleTodo";
import { cn } from "@/src/utils/cn";
import { Box, Stack } from "@mui/material";
// import { useDropzone } from "react-dropzone";

const sampleTodos: TodoType[] = [
  {
    id: 1,
    text: "hello",
    isCompleted: false
  },
  {
    id: 2,
    text: "todo 2",
    isCompleted: true
  },
  {
    id: 3,
    text: "how r u  3",
    isCompleted: false
  }
];


export type TodoType = {
  id: number;
  text: string;
  isCompleted: boolean;
};

export default function Home() {
  // drag and drop

  // const { getRootProps, getInputProps } = useDropzone({
  //   onDrop: (acceptedFiles) => {
  //     handleDrop(acceptedFiles);
  //   }
  // });

  function handleDrop(acceptedFiles: File[]) {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        const fileContent = reader.result as string;
        // Assuming each line in the text file represents a new Todo
        const newTodos = fileContent.split("\n").map((text, index) => ({
          id: index + 1 + todos.length,
          // id: index.toString() + Math.random(),
          // id: "id" + Math.random().toString(16).slice(2) + index,
          isCompleted: false,
          text: text.trim()
        }));
        setTodos((prevTodos) => [...prevTodos, ...newTodos]);
      };
      reader.readAsText(file);
    });
  }

  // drag and drop ***
  const [animationParent] = useAutoAnimate();

  const [todos, setTodos] = useState(sampleTodos);

  const [inputText, setInputText] = useState("");
  const [isTodoCompleted, setTodoCompleted] = useState(false);
  const [editModeId, setEditModeId] = useState<number | null>(null);
  const [textValue, setTextValue] = useState("");
  const [todoState, setTodoState] = useState<"all" | "active" | "completed">(
    "all"
  );

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (inputText.trim() !== "") {
      const isExistingTodo = todos.some((todo) => todo.text === inputText);

      if (isExistingTodo) {
        alert("This todo is already exists");
        setInputText("");
        setTodoCompleted(false);
        return;
      }

      const newTodo: TodoType = {
        id: todos.length + 1,
        isCompleted: isTodoCompleted,
        text: inputText
      };

      setTodos([...todos, newTodo]);
      setInputText("");
    }
  }

  // function handleAddTodo(){

  // }

  function deleteTodo(id: number) {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
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

  return (
    <Box component="main" sx={{position: "relative", paddingInline: "1rem"}}>
      <BackgroundImage />

      <Stack
        spacing={{ xs: 2, sm: 3 }}
        direction="column"
        useFlexGap
        maxWidth={"32rem"}
        marginInline={"auto"}
        alignItems="center"
        sx={{paddingTop: ["5rem", "8rem"]}}
      >
        
        <Stack direction="column" useFlexGap spacing={{ xs: 2, sm: 3 }} width={"100%"}>
          {/* input */}
          <InputBox
            isCheckBoxDisabled={inputText.length <= 0 ? true : false}
            isTodoCompleted={isTodoCompleted}
            setTodoCompleted={setTodoCompleted}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onSubmit={handleSubmit}
            text="Add"
          />

          {/* todos */}
          <div
            ref={animationParent}
            className="bg-white dark:bg-slate-800  w-full rounded-md border dark:border-slate-900 "
          >
            {/* single todo  */}
            {todoState === "all" &&
              todos.map((d, i) => (
                <SingleTodo
                  key={i}
                  setTextValue={setTextValue}
                  editModeId={editModeId}
                  textValue={textValue}
                  saveEditTodo={saveEditTodo}
                  editTodo={editTodo}
                  d={d}
                  handleIsTodoCompleted={() => handleIsTodoCompleted(d)}
                  deleteTodo={() => deleteTodo(d.id)}
                  isCompleted={d.isCompleted}
                  text={d.text}
                />
              ))}
            {todoState === "active" &&
              activeTodos.map((d, i) => (
                <SingleTodo
                  key={i}
                  setTextValue={setTextValue}
                  editModeId={editModeId}
                  textValue={textValue}
                  saveEditTodo={saveEditTodo}
                  editTodo={editTodo}
                  d={d}
                  handleIsTodoCompleted={() => handleIsTodoCompleted(d)}
                  deleteTodo={() => deleteTodo(d.id)}
                  isCompleted={d.isCompleted}
                  text={d.text}
                />
              ))}
            {todoState === "completed" &&
              completedTodos.map((d, i) => (
                <SingleTodo
                  key={i}
                  setTextValue={setTextValue}
                  editModeId={editModeId}
                  textValue={textValue}
                  saveEditTodo={saveEditTodo}
                  editTodo={editTodo}
                  d={d}
                  handleIsTodoCompleted={() => handleIsTodoCompleted(d)}
                  deleteTodo={() => deleteTodo(d.id)}
                  isCompleted={d.isCompleted}
                  text={d.text}
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
          </div>
        </Stack>
        {/* drag and drop  */}

        {/* <div
          {...getRootProps()}
          className="dropzone cursor-grab border-dashed border-2 border-gray-300 p-6 text-center"
        >
          <input {...getInputProps()} />
          <p>{`Drag 'n' drop some files here, or click to select files`}</p>
        </div> */}
        {/* Add the drop zone */}
      
      </Stack>
    </Box>
  );
}

function BackgroundImage() {
  const [animationParent] = useAutoAnimate();
  return (
    <Box ref={animationParent} sx={{position: "absolute", top: 0, left: 0, zIndex: -10, width: "100%", height: "20rem"}}>
      
        <>
          <Image
            className="w-full hidden md:flex bg-cover h-full"
            src={bgDesktopDark}
            alt="bg-desktop-dark"
          />
          <Image
            className="w-full md:hidden"
            src={bgMobiledark}
            alt="bg-desktop-dark"
          />
        </>
      
    </Box>
  );
}