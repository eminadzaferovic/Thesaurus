/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ThesaurusAddComponent } from './thesaurus-add.component';

describe('ThesaurusAddComponent', () => {
  let component: ThesaurusAddComponent;
  let fixture: ComponentFixture<ThesaurusAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThesaurusAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThesaurusAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
