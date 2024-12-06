import { generateId } from "@/src/utils/generateId";

export class Todo {
    id: string;
    
    constructor(private todo: string, private userId: string, private completed: number, private dueDate?: string) {
        this.id = generateId();
    }


    public markComplete() {
    this.completed = 1; // Mark as completed (assuming 1 for true, 0 for false)
    }
      
    public getTodo() {
    return {
        id: this.id,
        todo: this.todo,
        userId: this.userId,
        completed: this.completed,
        dueDate: this.dueDate,
        };
    }
}