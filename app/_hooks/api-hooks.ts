"use client"
import { getTodosController } from "@/src/interface-adapters/controllers/todos.controller"

export const useGetTodos = async () => {
    const todos = getTodosController()
    return todos
}