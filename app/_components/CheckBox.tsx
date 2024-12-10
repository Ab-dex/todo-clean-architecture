import { cn } from "@/src/utils/cn";
import { Box } from "@mui/material";
import React from "react";
import { FaCheck } from "react-icons/fa6";

type CheckBoxProps = {
  className?: string;
  completed?: boolean;
};

export default function CheckBox({ className, completed }: CheckBoxProps) {
  return (
    <Box
      className={cn(
        "h-5 w-5 cursor-pointer min-h-5 min-w-5 border rounded-full flex items-center justify-center text-white text-center",
        {
          "bg-gradient-to-t  from-[hsl(280,87%,65%)] to-[hsl(192,100%,67%)]":
            completed
        },
        className
      )}
    >
      {completed && <FaCheck className="text-sm" />}
    </Box>
  );
}