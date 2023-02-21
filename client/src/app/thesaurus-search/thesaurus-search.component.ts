import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../general.service';

@Component({
  selector: 'app-thesaurus-search',
  templateUrl: './thesaurus-search.component.html',
  styleUrls: ['./thesaurus-search.component.css']
})
export class ThesaurusSearchComponent implements OnInit {

  wordSynonyms: string[] = [];

  constructor(private generalService: GeneralService) { }

  ngOnInit() {
  }

  setSearchTerm(word: string){
    this.generalService.setSearchTerm(word);
  }

  getSynonymsForWord(){
    this.generalService.getSynonymsForWord();
  }
}
