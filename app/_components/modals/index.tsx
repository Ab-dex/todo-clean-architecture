"use client"
import React, { createContext, FC, useContext } from "react";
import { useAppContext } from "@/app/_contexts/AppContext";
import { ActionType, ModalType, StateType } from "@/app/_contexts/context.types";
import EditTodoModal from "./EditTodo";
import { ITodo } from "@/src/domain/models/todos";

export const MODAL_COMPONENTS: Record<any, FC<any>> = {
  [ModalType.EDIT_TODO]: EditTodoModal,
};

export const modalContext = createContext<any>({});



export const useModalContext = () :{
    state: StateType;
    dispatch: React.Dispatch<any>;
  } => useContext(modalContext)

const ModalRootContainer: FC = () => {
  const { state } = useAppContext();
  const { modalType, modalData } = state;

  if (!modalType) return null;

  const SpecificModal = MODAL_COMPONENTS[modalType];

  return (
    <modalContext.Provider value={modalData as ITodo}>
      <SpecificModal />
    </modalContext.Provider>
  );
};

export default ModalRootContainer;
