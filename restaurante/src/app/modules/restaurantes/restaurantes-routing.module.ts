import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RestaurantesListaComponent } from './pages/restaurantes-lista/restaurantes-lista.component';
import { RestauranteNovoComponent } from './pages/restaurante-novo/restaurante-novo.component';
import { RestauranteEdicaoComponent } from './pages/restaurante-edicao/restaurante-edicao.component';
import { RestauranteResolverService } from 'src/app/core/resolvers/restaurante-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: RestaurantesListaComponent
  },
  {
    path: 'novo',
    component: RestauranteNovoComponent
  },
  {
    path: ':id',
    component: RestauranteEdicaoComponent,
    resolve: {
      restaurante: RestauranteResolverService
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RestaurantesRoutingModule { }
