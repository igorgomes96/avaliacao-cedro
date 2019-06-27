import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavigationComponent } from './components/navigation/navigation.component';
import { SharedModule } from '../shared/shared.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [NavigationComponent, FooterComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    NavigationComponent,
    FooterComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    }
  ]
})
export class CoreModule { }
