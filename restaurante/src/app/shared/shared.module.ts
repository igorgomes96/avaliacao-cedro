import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { PanelComponent } from './components/panel/panel.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomInputComponent } from './components/custom-input/custom-input.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [PanelComponent, CustomInputComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule
  ],
  exports: [
    RouterModule,
    NgbModule,
    PanelComponent,
    FormsModule,
    ReactiveFormsModule,
    CustomInputComponent,
    HttpClientModule
  ]
})
export class SharedModule { }
