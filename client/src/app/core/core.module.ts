import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AppModule } from '../app.module';
import { ThesaurusSearchComponent } from '../thesaurus-search/thesaurus-search.component';
import { Router, RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    NavBarComponent,
    ThesaurusSearchComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    NavBarComponent
  ]
})
export class CoreModule { }
