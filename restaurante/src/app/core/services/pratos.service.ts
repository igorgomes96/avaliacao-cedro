import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { GenericCrud } from './generic-crud';
import { Prato } from 'src/app/shared/models/prato';
import { environment } from 'src/environments/environment';
import { endpoints } from 'src/environments/endpoints';

@Injectable({
  providedIn: 'root'
})
export class PratosService extends GenericCrud<Prato> {

  constructor(private http: HttpClient) {
    super(http, environment.apiUrl + endpoints.pratos);
  }
}
