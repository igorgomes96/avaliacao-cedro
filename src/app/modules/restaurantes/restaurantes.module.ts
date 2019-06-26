import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RestaurantesRoutingModule } from './restaurantes-routing.module';
import { RestauranteFormComponent } from './components/restaurante-form/restaurante-form.component';
import { RestauranteNovoComponent } from './pages/restaurante-novo/restaurante-novo.component';
import { RestauranteEdicaoComponent } from './pages/restaurante-edicao/restaurante-edicao.component';
import { RestaurantesListaComponent } from './pages/restaurantes-lista/restaurantes-lista.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RestaurantesPesquisaComponent } from './components/restaurantes-pesquisa/restaurantes-pesquisa.component';

@NgModule({
  declarations: [RestauranteFormComponent, RestauranteNovoComponent, RestauranteEdicaoComponent, RestaurantesListaComponent, RestaurantesPesquisaComponent],
  imports: [
    CommonModule,
    RestaurantesRoutingModule,
    SharedModule
  ]
})
export class RestaurantesModule { }
