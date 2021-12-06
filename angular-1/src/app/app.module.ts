import { HttpClientModule } from '@angular/common/http';
import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { AppComponent } from './app.component';
import { DictionaryComponent } from './dictionary/dictionary.component';
import { LearningComponent } from './learning/learning.component';
import { SettingsComponent } from './settings/settings.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PracticeComponent } from './practice/practice.component';

const appRoutes: Routes = [
   { path: '', component: AppComponent },
   { path: 'dictionary', component: DictionaryComponent },
   { path: 'learn', component: LearningComponent },
   { path: 'setting', component: SettingsComponent },
   { path: 'practice', component: PracticeComponent },
   { path: '**', component: NotFoundComponent },
]

@NgModule({
   declarations: [
      AppComponent,
      DictionaryComponent,
      LearningComponent,
      SettingsComponent,
      NotFoundComponent,
      PracticeComponent,
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      MatTableModule,
      MatButtonModule,
      MatInputModule,
      MatFormFieldModule,
      MatTabsModule,
      BrowserAnimationsModule,
      MatSelectModule,
      MatPaginatorModule,
      MatCheckboxModule,
      RouterModule.forRoot(appRoutes)
   ],
   providers: [],
   bootstrap: [AppComponent]
})
export class AppModule { }
