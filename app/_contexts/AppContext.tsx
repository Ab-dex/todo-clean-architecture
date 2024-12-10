"use client"
import React, { Dispatch, ReactElement, createContext, useContext, useReducer } from "react";
import { ActionType, StateType, Types } from "./context.types";

// Initial state definition
const initialState: StateType = {
  modalType: undefined,
  modalData: undefined,
};

// Reducer function
const reducer: React.Reducer<StateType, ActionType> = (state, action) => {
  switch (action.type) {

    case Types.SHOW_MODAL:
      return {
        ...state,
        modalType: action.payload.modalType,
        modalData: action.payload.modalData,
      };

    case Types.HIDE_MODAL:
      return { ...state, modalType: undefined, modalData: undefined };

    default:
      return state;
  }
};

// Context creation
export const AppContext = createContext<{
  state: StateType;
  dispatch: Dispatch<ActionType>;
}>({
  state: initialState,
  dispatch: () => null,
});

export const useAppContext = (): {
    state: StateType;
    dispatch: React.Dispatch<ActionType>;
  } => useContext(AppContext)

// Provider component
const AppContextProvider: React.FC<{ children: ReactElement }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
