import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ThesaurusAddComponent } from './thesaurus-add/thesaurus-add.component';
import { ThesaurusHomeComponent } from './thesaurus-home/thesaurus-home.component';
import { ThesaurusSearchComponent } from './thesaurus-search/thesaurus-search.component';

const routes: Routes = [
  {path: '', component: ThesaurusHomeComponent},
  {path: 'thesaurus-add', component: ThesaurusAddComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
