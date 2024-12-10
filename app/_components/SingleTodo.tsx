"use client"
import React, { useState } from "react";
import CheckBox from "./CheckBox";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { cn } from "@/src/utils/cn";
import { ITodo } from "@/src/domain/models/todos";
import { Tooltip } from "@mui/material";

type Props = {
  activeTodo: ITodo;
  className?: string;
  text: string;
  isCompleted: boolean;
  deleteTodo: (id: string) => void;
  handleIsTodoCompleted: (todo: ITodo) => void;
  editTodo: (id: string) => void;
};

export default function SingleTodo({
  className,
  text,
  isCompleted,
  deleteTodo,
  handleIsTodoCompleted,
  activeTodo,
  editTodo,
}: Props) {

  const [tooltipOpen, setTooltipOpen] = useState(false);

  // Handle click to toggle tooltip visibility
  const handleTooltipClick = () => {
    setTooltipOpen((prev) => !prev);
  };
  return (
    <div
      className={cn(
        " border-b dark:border-slate-500 px-3 md:px-5 w-full  h-[50px] flex items-center justify-between gap-2",
        " ",
        className
      )}
    >
      <button onClick={() => handleIsTodoCompleted(activeTodo)}>
        <CheckBox completed={isCompleted} />
      </button>
      <div className="flex w-[92%] h-full justify-between items-center">
      <Tooltip title={text} arrow open={tooltipOpen}
          onClose={() => setTooltipOpen(false)}
          onClick={handleTooltipClick}>
          <p
            className={cn(
              "truncate text-gray-600 overflow-hidden break-words w-[calc(100%-4rem)] cursor-pointer",
              {
                "line-through": isCompleted,
              }
            )}
          >
            {text}
          </p>
        </Tooltip>

        <div className="flex gap-2 w-[4rem] items-center text-xl justify-end">
          <MdEdit
            onClick={() => editTodo(activeTodo?.id!)}
            className="cursor-pointer dark:text-white"
          />
          <MdDelete
            onClick={() => deleteTodo(activeTodo?.id!)}
            className="cursor-pointer text-red-500"
          />
        </div>
      </div>
    </div>
  );
}