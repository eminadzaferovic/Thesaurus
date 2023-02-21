import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private toastrService: ToastrService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    //use pipe to use the rxjs operator catcherror to catch the error out of the observable
    return next.handle(request).pipe(
      catchError(error => {
        if(error) {
          this.toastrService.error(error.message, error.statusCode);
        }
        return throwError(error);
      })
    );
  }
}
