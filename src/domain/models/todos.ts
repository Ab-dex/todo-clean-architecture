import { generateId } from "@/src/utils/generateId";


export interface ITodo {
    id: string;
    todo: string;
    completed: boolean;
    dueDate?: string | null;
}
export class Todo implements ITodo {
    public id: string;
    public completed: boolean;
    
    constructor(public todo: string, completed: number, public dueDate?: string) {
        this.id = generateId();
        this.completed = Boolean(completed)
    }


    public markComplete() {
        this.completed = true; // Mark as completed (assuming 1 for true, 0 for false)
    }
      
    public getTodo() {
    return {
        id: this.id,
        todo: this.todo,
        completed: this.completed,
        dueDate: this.dueDate,
        };
    }
}