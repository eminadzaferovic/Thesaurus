import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GeneralService } from '../general.service';
import { Thesaurus } from '../shared/models/Thesaurus';

@Component({
  selector: 'app-thesaurus-add',
  templateUrl: './thesaurus-add.component.html',
  styleUrls: ['./thesaurus-add.component.css']
})
export class ThesaurusAddComponent implements OnInit {

  thesaurusForm: FormGroup;
  thesaurusModel: any = {};
  submitted: boolean = false;
  wordKeyValue: boolean = false;

  constructor(private formBuilder: FormBuilder, private generalService: GeneralService) {
    this.thesaurusForm = this.formBuilder.group({
      thesaurusKey: [{ value: '', disabled: false }, Validators.required], 
      thesaurusValue: [{ value: '', disabled: false }, Validators.required]
    });
  }

  ngOnInit() {
   
  }

  addSynonym(){
    this.thesaurusModel = this.thesaurusForm.getRawValue();
    this.generalService.addSynonym(this.thesaurusModel);    
  }
   
  get f() { return this.thesaurusForm.controls; }

    onSubmit() {
        this.submitted = true;

        if (this.thesaurusForm.invalid) {
            return;
        }
        else{
          this.addSynonym();          
        }
    }
}


