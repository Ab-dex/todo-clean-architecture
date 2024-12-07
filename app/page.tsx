import { Box, Stack, Typography } from "@mui/material";
import Todos from "./Todos";
import bgDesktopDark from "@/assets/images/bg-desktop-dark.jpg";
import bgMobiledark from "@/assets/images/bg-mobile-dark.jpg";
import AnimateBackgroundImage from "./_components/BackroundImage";
import Image from "next/image";
import UserMenu from "./_components/UserMenu";


export default async function Home() {
  
  // drag and drop

  // const { getRootProps, getInputProps } = useDropzone({
  //   onDrop: (acceptedFiles) => {
  //     handleDrop(acceptedFiles);
  //   }
  // });

  // function handleDrop(acceptedFiles: File[]) {
  //   acceptedFiles.forEach((file) => {
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       const fileContent = reader.result as string;
  //       // Assuming each line in the text file represents a new Todo
  //       const newTodos = fileContent.split("\n").map((text, index) => ({
  //         id: index + 1 + todos.length,
  //         // id: index.toString() + Math.random(),
  //         // id: "id" + Math.random().toString(16).slice(2) + index,
  //         isCompleted: false,
  //         text: text.trim()
  //       }));
  //       setTodos((prevTodos) => [...prevTodos, ...newTodos]);
  //     };
  //     reader.readAsText(file);
  //   });
  // }


  // function handleAddTodo(){

  // }

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
        <UserMenu/>

        </Stack>
        
        <Todos/>
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

