import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PratosRoutingModule } from './pratos-routing.module';
import { PratoFormComponent } from './components/prato-form/prato-form.component';
import { PratoNovoComponent } from './pages/prato-novo/prato-novo.component';
import { PratoEdicaoComponent } from './pages/prato-edicao/prato-edicao.component';
import { PratosListaComponent } from './pages/pratos-lista/pratos-lista.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [PratoFormComponent, PratoNovoComponent, PratoEdicaoComponent, PratosListaComponent],
  imports: [
    CommonModule,
    PratosRoutingModule,
    SharedModule
  ]
})
export class PratosModule { }
