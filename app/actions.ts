'use server';

import { getInjection } from '@/di/container';

export async function getTodos() {
    try{
        const getTodosController = getInjection(
          'IGetTodosController'
        );
        return await getTodosController();
      } catch (err) {
        
        throw err;
  }
}