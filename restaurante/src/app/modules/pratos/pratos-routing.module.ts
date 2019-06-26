import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PratoNovoComponent } from './pages/prato-novo/prato-novo.component';
import { PratosListaComponent } from './pages/pratos-lista/pratos-lista.component';
import { PratoEdicaoComponent } from './pages/prato-edicao/prato-edicao.component';
import { PratoResolverService } from 'src/app/core/resolvers/prato-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: PratosListaComponent
  },
  {
    path: 'novo',
    component: PratoNovoComponent
  },
  {
    path: ':id',
    component: PratoEdicaoComponent,
    resolve: {
      prato: PratoResolverService
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PratosRoutingModule { }
