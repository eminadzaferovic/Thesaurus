import { Component, OnInit } from '@angular/core';
import { delay, Subject, takeUntil } from 'rxjs';
import { GeneralService } from '../general.service';

@Component({
  selector: 'app-thesaurus-home',
  templateUrl: './thesaurus-home.component.html',
  styleUrls: ['./thesaurus-home.component.css']
})
export class ThesaurusHomeComponent implements OnInit {
  thesaurus : any[]= [];
  searchTerm: string = "";
  wordSynonyms: any;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private generalService: GeneralService) { }

  ngOnInit() {
    this.getThesaurus();
    this.generalService.wordSynonymsUpdated.subscribe(() => {
      this.wordSynonyms = this.generalService.getWordSynonyms();
      this.searchTerm = this.generalService.getSearchTerm();
    });
  }

  getThesaurus(){
    this.generalService.getThesaurus().pipe(takeUntil(this.destroy$)).subscribe(data => {
      Object.entries(data).forEach(
        ([key, value]) => {
          console.log(key, value);
          this.thesaurus.push({key: key, value: value});
        }
      );
      console.log(this.thesaurus);      
    }, error =>{
      console.log(error);
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
