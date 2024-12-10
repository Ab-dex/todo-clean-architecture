"use client";
import React, { createContext, FC, useContext } from "react";
import { useAppContext } from "@/app/_contexts/AppContext";
import { ModalType, StateType, TodoModalContextType } from "@/app/_contexts/context.types";
import { ITodo } from "@/src/domain/models/todos";
import EditTodoModal from "../_components/modals/EditTodo";

// Mapping modal types to their respective components
export const MODAL_COMPONENTS: Record<ModalType, FC<any>> = {
  [ModalType.EDIT_TODO]: EditTodoModal,
};

// Define the modal context with the specific data type for modalData
export const modalContext = createContext<TodoModalContextType | undefined>(undefined);

export const useModalContext = () => useContext(modalContext) as TodoModalContextType;

const ModalRootContainer: FC = () => {
  const { state } = useAppContext();
  const { modalType, modalData } = state;

  if (!modalType) return null;

  // Get the specific modal component based on the modalType
  const SpecificModal = MODAL_COMPONENTS[modalType];

  return (
    <modalContext.Provider value={modalData as TodoModalContextType}>
      <SpecificModal />
    </modalContext.Provider>
  );
};

export default ModalRootContainer;
