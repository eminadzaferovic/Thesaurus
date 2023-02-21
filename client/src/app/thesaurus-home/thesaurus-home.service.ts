import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Thesaurus } from '../shared/models/Thesaurus';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ThesaurusHomeService {

  baseUrl = "http://localhost:5217/api/";

  constructor(private http: HttpClient) { }

  getThesaurus() {
    return this.http.get<Thesaurus>(this.baseUrl + "Thesaurus/getthesaurus/");
  }

  getSynonymsForWord(word: string){
    return this.http.get<string[]>(this.baseUrl + "Thesaurus/getsynonymsforword/${word}");
  }

}
