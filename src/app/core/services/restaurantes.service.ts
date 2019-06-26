import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { GenericCrud } from './generic-crud';
import { Restaurante } from 'src/app/shared/models/restaurante';
import { environment } from 'src/environments/environment';
import { endpoints } from 'src/environments/endpoints';

@Injectable({
  providedIn: 'root'
})
export class RestaurantesService extends GenericCrud<Restaurante> {

  constructor(private http: HttpClient) {
    super(http, environment.apiUrl + endpoints.restaurantes);
  }
}
