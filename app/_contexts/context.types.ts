import { ITodo } from "@/src/domain/models/todos";

// Action Types Enum
export enum Types {
    SHOW_MODAL = "SHOW_MODAL",
    HIDE_MODAL = "HIDE_MODAL",
  }

export enum ModalType {
    EDIT_TODO = "EDIT_TODO"
}
  
  // Payload Definitions
  type Payloads = {
    [Types.SHOW_MODAL]: {
      modalType: ModalType;
      modalData?: ITodo;
    };
    [Types.HIDE_MODAL]: undefined;
  };
  
  // Generalized Action Map
  type ActionMap<M extends Record<string, unknown>> = {
    [Key in keyof M]: M[Key] extends undefined
      ? { type: Key } // No payload case
      : { type: Key; payload: M[Key] }; // Payload case
  };
  
  // Action Type Definition
  export type ActionType = ActionMap<Payloads>[keyof ActionMap<Payloads>];
  
  // State Type Definition
  export type StateType = {
    modalType?: ModalType;
    modalData?: ITodo;
  };
  