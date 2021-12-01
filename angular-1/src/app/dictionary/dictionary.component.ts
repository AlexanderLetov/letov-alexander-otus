import { Component, OnInit, ViewChild } from '@angular/core';
import { Learn, LearningService } from '../shared/learning.service';
import { MatTable } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Component({
   selector: 'app-dictionary',
   templateUrl: './dictionary.component.html',
   styleUrls: ['./dictionary.component.css']
})
export class DictionaryComponent implements OnInit {
   @ViewChild(MatTable) dictTable!: MatTable<any>;
   constructor(public learningService: LearningService, private http: HttpClient) { }

   dataSource = this.learningService.learns;
   displayedColumns: string[] = ['id', 'rus', 'eng', 'completed'];
   newLearnVal: string = ''

   ngOnInit(): void {
   }

   onChange(id: number) {
      this.learningService.onToggle(id)
   }

   removeTodo(id: number) {
      this.learningService.removeTodo(id)
   }

   addLearn() {
      this.http.get(`https://api.mymemory.translated.net/get?q=${this.newLearnVal}&langpair=rus|en`)
         .pipe(tap(data => { }),
      ).subscribe(result => {

         let _eng = (result as any).responseData.translatedText;
         if (this.newLearnVal === _eng) {
            alert("Перевод слова не найден");
            return;
         }
         const todo: Learn = {
            id: (this.learningService.learns.length === 0) ? 1 : Math.max.apply(Math, this.learningService.learns.map(function (o) { return o.id; })) + 1,
            eng: _eng,
            rus: this.newLearnVal,
            completed: false,
            date: new Date()
         }

         this.learningService.addLearn(todo);
         this.newLearnVal = '';
         this.dictTable.renderRows();

      }
      );
   }
}