"use client"

import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Box } from "@mui/material";
import { ReactElement } from "react";

export default function AnimateBackgroundImage({children} : {children : ReactElement}) {
    const [animationParent] = useAutoAnimate();
    return (
      <Box ref={animationParent} sx={{position: "absolute", top: 0, left: 0, zIndex: -10, width: "100%", height: "20rem"}}> 
        {children}
      </Box>
    );
  }