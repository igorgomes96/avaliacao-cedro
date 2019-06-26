import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Restaurante } from 'src/app/shared/models/restaurante';

@Component({
  selector: 'app-restaurante-form',
  templateUrl: './restaurante-form.component.html',
  styleUrls: ['./restaurante-form.component.css']
})
export class RestauranteFormComponent implements OnInit {

  @Input() restaurante = new Restaurante();
  @Output() salvar = new EventEmitter<Restaurante>();
  @Output() cancelar = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

  onSalvar() {
    this.salvar.emit(this.restaurante);
  }

  onCancelar() {
    this.cancelar.emit();
  }

}
