import { Component, OnInit } from '@angular/core';
import { Learn, LearningService } from '../shared/learning.service';

@Component({
   selector: 'app-practice',
   templateUrl: './practice.component.html',
   styleUrls: ['./practice.component.css']
})
export class PracticeComponent implements OnInit {

   constructor(public learningService: LearningService) { }
   resultPractice_Faild = 0;
   resultPractice_Success = 0;
   randomLearns: Learn[] = [];
   currItem: number = 0;
   currText: string = '';
   userText: string = '';

   ngOnInit(): void {
   }

   ngAfterViewInit() {
      this.start();
   }

   start() {
      this.randomLearns = this.learningService.learns.sort(function (a, b) { return 0.5 - Math.random() });
      this.currItem = 0
      this.currText = this.randomLearns[0].eng
      this.resultPractice_Faild = 0
      this.resultPractice_Success = 0
      this.userText = ''
   }

   nextLearn() {
      let rusValue = this.randomLearns[this.currItem].rus;
      if (rusValue.toLowerCase() === this.userText.toLowerCase()) {
         this.resultPractice_Success = this.resultPractice_Success + 1;
      } else {
         this.resultPractice_Faild = this.resultPractice_Faild + 1;
      }

      if (this.currItem + 1 < this.randomLearns.length) {
         this.currItem = this.currItem + 1;
         this.currText = this.randomLearns[this.currItem].eng;
         this.userText = '';
      } else {
         alert(`Успешно отвечено: ${this.resultPractice_Success} с ошибками: ${this.resultPractice_Faild}`);
         this.start();
      }

   }

}
