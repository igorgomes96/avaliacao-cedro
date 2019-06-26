import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './modules/home/pages/home/home.component';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'restaurantes',
    loadChildren: () => import('./modules/restaurantes/restaurantes.module').then(m => m.RestaurantesModule)
  },
  {
    path: 'pratos',
    loadChildren: () => import('./modules/pratos/pratos.module').then(m => m.PratosModule)
  },
  {
    path: 'nao-encontrado',
    loadChildren: () => import('./modules/nao-encontrado/nao-encontrado.module').then(m => m.NaoEncontradoModule)
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: '/nao-encontrado' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
