import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Prato } from 'src/app/shared/models/prato';
import { Restaurante } from 'src/app/shared/models/restaurante';
import { RestaurantesService } from 'src/app/core/services/restaurantes.service';

@Component({
  selector: 'app-prato-form',
  templateUrl: './prato-form.component.html',
  styleUrls: ['./prato-form.component.css']
})
export class PratoFormComponent implements OnInit {

  restaurantes: Restaurante[] = [];

  @Input() prato = new Prato();
  @Output() salvar = new EventEmitter<Prato>();
  @Output() cancelar = new EventEmitter<void>();

  constructor(private restaurantesService: RestaurantesService) { }

  ngOnInit() {
    this.restaurantesService.getAll()
    .subscribe((restaurantes: Restaurante[]) => {
      this.restaurantes = restaurantes;
    })
  }

  onSalvar() {
    this.salvar.emit(this.prato);
  }

  onCancelar() {
    this.cancelar.emit();
  }

}
