import React, { SetStateAction } from "react";
import CheckBox from "./CheckBox";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { cn } from "@/src/utils/cn";
import { ITodo } from "@/src/domain/models/todos";

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
  return (
    <div
      className={cn(
        " border-b dark:border-slate-500  px-5 w-full  h-[50px] flex items-center gap-3 ",
        " ",
        className
      )}
    >
      <button onClick={() => handleIsTodoCompleted(activeTodo)}>
        <CheckBox isCompleted={isCompleted} />
      </button>
      <div className="flex w-full h-full justify-between items-center">
            <p
              className={cn("    text-gray-600 ", {
                "line-through": isCompleted
              })}
            >
              {text}
            </p>

            <div className=" flex gap-2 items-center text-xl ">
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