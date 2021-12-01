import { Component, OnInit } from '@angular/core';
import { Learn, LearningService } from '../shared/learning.service';

@Component({
   selector: 'app-learning',
   templateUrl: './learning.component.html',
   styleUrls: ['./learning.component.css']
})
export class LearningComponent implements OnInit {
   constructor(public learningService: LearningService) { }

   translateVal: string = '';
   rusVal: number = 0;

   ngOnInit(): void {

   }

   check() {
      if (this.rusVal === 0 || this.translateVal === "") {
         alert("Заполнены не все поля");
         return;
      }

      let coorectVal = this.learningService.learns.find(item => item.id === this.rusVal)?.eng || "";
      let correct = false;

      if (!this.learningService.setting_caseSensitive) {
         if (coorectVal.toLowerCase() === this.translateVal.toLowerCase()) correct = true;
      } else {
         if (coorectVal === this.translateVal) correct = true;
      }

      if (correct) {
         this.learningService.onToggle(this.rusVal);
         this.translateVal = '';
         alert("Всё верно!");
      } else {
         alert("Английское слово введено не корректно");
      }

   }

}
