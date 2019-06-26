import { Component, OnInit } from '@angular/core';

import { switchMap } from 'rxjs/operators';

import { Restaurante } from 'src/app/shared/models/restaurante';
import { RestaurantesService } from 'src/app/core/services/restaurantes.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-restaurantes-lista',
  templateUrl: './restaurantes-lista.component.html',
  styleUrls: ['./restaurantes-lista.component.css']
})
export class RestaurantesListaComponent implements OnInit {

  restaurantes: Restaurante[];
  constructor(private restaurantesService: RestaurantesService) { }

  ngOnInit() {
    this.restaurantesService.getAll()
      .subscribe((restaurantes: Restaurante[]) => {
        this.restaurantes = restaurantes;
      });
  }

  pesquisa(texto: string) {
    const params = texto ? { nome: texto } : undefined;
    this.restaurantesService.getAll(params)
      .subscribe((restaurantes: Restaurante[]) => {
        this.restaurantes = restaurantes;
      });
  }

  delete(id: number) {
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Você não conseguirá desfazer a exclussão desse restaurante.',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Cancelar'
    }).then((confirmacao) => {
      if (confirmacao.value) {
        this.restaurantesService.delete(id)
          .pipe(
            switchMap(_ => this.restaurantesService.getAll())
          ).subscribe((restaurantes: Restaurante[]) => {
            this.restaurantes = restaurantes;
          });
      }
    });
  }

}
