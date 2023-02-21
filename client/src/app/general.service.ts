import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map, Subject, takeUntil } from 'rxjs';
import { Thesaurus } from './shared/models/Thesaurus';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  baseUrl = "http://localhost:5217/api/";

  searchTerm: string = "";
  wordSynonyms: string = "";
  wordAdded: any;
  currentRoute: string = "";
  mergeData: string = "";

  destroy$: Subject<boolean> = new Subject<boolean>();
  searchTermUpdated: EventEmitter<any> = new EventEmitter();
  wordSynonymsUpdated: EventEmitter<any> = new EventEmitter();

  constructor(private http: HttpClient, private toastrService: ToastrService, private router: Router) { }

  public getSearchTerm(): string {
    return this.searchTerm;
  }

  public setSearchTerm(word: string): void {
    this.searchTerm = word;
    this.searchTermUpdated.emit(this.searchTerm);
  }

  public getWordSynonyms(): string {
    return this.wordSynonyms;
  }

  public setWordSynonyms(word: string): void {
    this.wordSynonyms = word;
    this.wordSynonymsUpdated.emit(this.wordSynonyms);
  }

  getThesaurus() {
    return this.http.get<Thesaurus>(this.baseUrl + "Thesaurus/getthesaurus/");
  }

  getSynonymsForWord(){
    if(this.searchTerm != ""){
      this.http.get(this.baseUrl + "Thesaurus/getsynonymsforword/" + this.searchTerm, {responseType: 'text'})
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe(data => {
          data.replace(/,*$/, '');
          this.setWordSynonyms(data); 
      }, error => {
        this.toastrService.error("Word does not exist");
      });
    }
    else{
      this.toastrService.error("Search term is required");
    }
  }


  addSynonym(model: Thesaurus) {
    this.http.post(this.baseUrl + "Thesaurus/addsynonymsforword/", model)
    .pipe(takeUntil(this.destroy$))
    .subscribe(() => {
      this.toastrService.success("Synonym was successfully added");
      this.router.navigateByUrl('');
    }, error => {
      this.toastrService.error("There was an error while adding the synonym");
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
