import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, empty, of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private toastr: ToastrService, private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        tap(_ => {}, (event: HttpEvent<any>) => {
          if (event instanceof HttpErrorResponse) {
            this.toastr.error(event.error || event.message, 'Erro ao processar requisição!');
            return Observable.create(empty);
          }
          return of(event);
        })
      );
  }
}
