import { Injectable } from '@angular/core';
import { Resolve, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Prato } from 'src/app/shared/models/prato';
import { PratosService } from '../services/pratos.service';

@Injectable({
  providedIn: 'root'
})
export class PratoResolverService implements Resolve<Prato> {

  constructor(private api: PratosService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Prato> {
    if (route.paramMap.has('id')) {
      const id: number = +route.paramMap.get('id');
      return this.api.get(id).pipe(
        catchError(_ => {
          this.router.navigate(['/nao-encontrado']);
          return of(null);
        })
      );
    } else {
      this.router.navigate(['/nao-encontrado']);
    }
  }

}
