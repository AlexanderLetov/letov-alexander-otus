import { Component } from '@angular/core';

@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.css']
})
export class AppComponent {
   appTitle = 'Learn English';
   links = [
      { path: 'dictionary', label: 'Словарь' },
      { path: 'learn', label: 'Тестирование' },
      { path: 'practice', label: 'Практика' },
      { path: 'setting', label: 'Настройки' },
   ];

   routerLinkActive = this.links[0];

}
