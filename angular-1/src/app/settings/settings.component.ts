import { Component, OnInit } from '@angular/core';
import { LearningService } from '../shared/learning.service';

@Component({
   selector: 'app-settings',
   templateUrl: './settings.component.html',
   styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

   constructor(public learningService: LearningService) { }

   ngOnInit(): void {
   }

   showOptions(event: boolean): void {
      this.learningService.setting_caseSensitive = event;
   }
}
