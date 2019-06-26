import { Injectable } from '@angular/core';
import { Resolve, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Restaurante } from 'src/app/shared/models/restaurante';
import { RestaurantesService } from '../services/restaurantes.service';

@Injectable({
  providedIn: 'root'
})
export class RestauranteResolverService implements Resolve<Restaurante> {

  constructor(private api: RestaurantesService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Restaurante> {
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
