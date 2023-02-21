import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { ThesaurusAddComponent } from './thesaurus-add/thesaurus-add.component';
import { ThesaurusHomeComponent } from './thesaurus-home/thesaurus-home.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';

@NgModule({
  declarations: [				
    AppComponent,
      ThesaurusAddComponent,
     //ThesaurusSearchComponent
      ThesaurusHomeComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    HttpClientModule,
    AccordionModule.forRoot(),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-center',
      preventDuplicates: true,
    })
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},],
  bootstrap: [AppComponent]
})
export class AppModule { }
