import React, { SetStateAction } from "react";
import CheckBox from "./CheckBox";
import { cn } from "@/src/utils/cn";
import { Button, Stack } from "@mui/material";

type InputBoxProps = {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
  onSubmit: React.FormEventHandler<HTMLFormElement> | undefined;
  setTodoCompleted: React.Dispatch<SetStateAction<boolean>>;
  isTodoCompleted: boolean;
  isCheckBoxDisabled: boolean;
  text?: string;
};

export default function InputBox({
  value,
  onChange,
  onSubmit,
  setTodoCompleted,
  isTodoCompleted,
  isCheckBoxDisabled,
  text = "Submit"
}: InputBoxProps) {
  function toggleCompleted() {
    setTodoCompleted(!isTodoCompleted);
  }

  return (
    <form onSubmit={onSubmit}>
        <Stack alignItems="center" useFlexGap padding={2} spacing={2} bgcolor="#ffffff" borderRadius="6px" className="shadow-lg">
            <Stack alignItems="center" useFlexGap direction="row" width="100%" position="relative" borderRadius="8px" border={1} borderColor={"#1e293b"} overflow="hidden" boxShadow={1}>
                <Button
                    disabled={isCheckBoxDisabled}
                    // disabled={true}
                    sx={{height:"3rem"}}
                    onClick={toggleCompleted}
                >
                    <CheckBox
                    className={cn({
                        "border-gray-200  dark:border-gray-700 cursor-not-allowed":
                        isCheckBoxDisabled
                    })}
                    completed={isTodoCompleted}
                    />
                </Button>
                <input
                    value={value}
                    maxLength={70}
                    onChange={onChange}
                    className="focus:border-none focus:outline-none pr-3 shadow-sm w-full h-[3rem] bg-transparent"
                    type="text"
                />
            </Stack>

            <Button variant="contained" type="submit">
                {text}
            </Button>
        </Stack>
    </form>
  );
}