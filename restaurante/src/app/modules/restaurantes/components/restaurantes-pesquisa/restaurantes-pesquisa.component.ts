import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-restaurantes-pesquisa',
  templateUrl: './restaurantes-pesquisa.component.html',
  styleUrls: ['./restaurantes-pesquisa.component.css']
})
export class RestaurantesPesquisaComponent implements OnInit {

  form: FormGroup;

  @Output() pesquisa = new EventEmitter<string>();

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      textoPesquisa: ['']
    });
  }

  buscar() {
    this.pesquisa.emit(this.form.get('textoPesquisa').value);
  }

}
