import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NaoEncontradoComponent } from './pages/nao-encontrado/nao-encontrado.component';

const routes: Routes = [{
  path: '',
  component: NaoEncontradoComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NaoEncontradoRoutingModule { }
