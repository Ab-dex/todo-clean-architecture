import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { ITodo } from "@/src/domain/models/todos";
import { useAppContext } from "../../_contexts/AppContext";
import { Types } from "../../_contexts/context.types";
import { updateTodo } from "@/app/_actions/todoAction";

const EditTodoModal = () => {
  const { state, dispatch } = useAppContext();
  const [todo, setTodo] = useState<ITodo>(state.modalData?.todo!);
  const [date, setDate] = useState<string | undefined>(todo?.dueDate as string | undefined)

  const handleClose = () => {
    dispatch({ type: Types.HIDE_MODAL });
  };

  const handleSave = () => {
    if(state.modalData?.updateTodo){
      state.modalData?.updateTodo({...todo, dueDate: date})
    }
    handleClose()
  };

  if (!state.modalType || state.modalType !== "EDIT_TODO") return null;

  return (
    <Modal open={!!state.modalType} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" component="h2" mb={2} color="black">
          Edit Todo
        </Typography>
        <TextField
          label="Content"
          fullWidth
          value={todo?.todo || ""}
          onChange={(e) =>
            setTodo((prev) => ({ ...prev, todo: e.target.value } as ITodo))
          }
          margin="normal"
          sx={{
            "& .MuiInputLabel-root": {
              color: "black",
            },
          }}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={todo?.completed || false}
              onChange={(e) =>
                setTodo((prev) => ({
                  ...prev,
                  completed: e.target.checked,
                } as ITodo))
              }
            />
          }
          label="Completed"
          sx={{
            "& .MuiFormControlLabel-label": {
              color: "black",
            },
          }}
        />
        <TextField
          label="Due Date"
          type="date"
          fullWidth
          InputLabelProps={{ shrink: true }}
          value={
            date ? date.split("T")[0] : ""
          }
          onChange={(e) =>
            setDate(
              e.target.value
                ? new Date(
                    new Date(e.target.value).setUTCHours(11, 59, 0, 0)
                  ).toISOString()
                : ""
            )
          }
          margin="normal"
          sx={{
            "& .MuiInputLabel-root": {
              color: "black",
            },
          }}
        />
        <Box mt={2} display="flex" justifyContent="space-between">
          
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>

          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditTodoModal;
