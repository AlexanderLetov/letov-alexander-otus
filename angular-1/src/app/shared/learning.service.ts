import { Injectable } from '@angular/core';

export interface Learn {
   id: number
   eng: string
   rus: string
   date: Date
   completed: boolean
}

@Injectable({ providedIn: 'root' })
export class LearningService {
   public learns: Learn[] = []
   public setting_caseSensitive: boolean = false;

   onToggle(id: number) {
      const idx = this.learns.findIndex(t => t.id === id)
      this.learns[idx].completed = !this.learns[idx].completed
   }

   removeTodo(id: number) {
      this.learns = this.learns.filter(t => t.id !== id)
   }

   addLearn(todo: Learn) {
      this.learns.push(todo);
   }

}