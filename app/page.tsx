import { Box, Stack, Typography } from "@mui/material";
import Todos from "./Todos";
import bgDesktopDark from "@/assets/images/bg-desktop-dark.jpg";
import bgMobiledark from "@/assets/images/bg-mobile-dark.jpg";
import AnimateBackgroundImage from "./_components/BackroundImage";
import Image from "next/image";
import UserMenu from "./_components/UserMenu";


export default async function Home() {

  return (
    <Box component="main" sx={{position: "relative", paddingInline: "1rem"}}>
      <AnimateBackgroundImage>
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
        </AnimateBackgroundImage>

      <Stack
        spacing={{ xs: 2, sm: 3 }}
        direction="column"
        useFlexGap
        maxWidth={"32rem"}
        marginInline={"auto"}
        alignItems="center"
        sx={{paddingTop: ["3rem", "3rem"]}}
      >

        <Stack direction="row" width={"100%"} justifyContent="space-between" alignItems="center">
        <Typography variant="h5">Todo List</Typography>

        </Stack>
        
        <Todos/>
      
      </Stack>
    </Box>
  );
}

