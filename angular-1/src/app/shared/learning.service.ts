import { Injectable } from '@angular/core';
// import { DictionaryComponent } from '../dictionary/dictionary.component';

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
   // constructor(public dictionaryComponent: DictionaryComponent) { }

   onToggle(id: number) {
      const idx = this.learns.findIndex(t => t.id === id)
      this.learns[idx].completed = !this.learns[idx].completed
      this.saveToLocalStorage();
   }

   removeTodo(id: number) {
      this.learns = this.learns.filter(t => t.id !== id)
      this.saveToLocalStorage();
   }

   addLearn(todo: Learn) {
      this.learns.push(todo);
      this.saveToLocalStorage();
   }

   saveToLocalStorage() {
      localStorage.setItem('dataSource', JSON.stringify(this.learns));
   }

   // readFromLocalStorage() {
   //    let local = localStorage.getItem('dataSource');
   //    if (local != null || local != "") {
   //       let data = JSON.parse(local || "");
   //       return data;
   //    }
   // }

}