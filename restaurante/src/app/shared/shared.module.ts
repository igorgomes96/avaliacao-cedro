import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { PanelComponent } from './components/panel/panel.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomInputComponent } from './components/custom-input/custom-input.component';
import { HttpClientModule } from '@angular/common/http';
import { PaginationComponent } from './components/pagination/pagination.component';

@NgModule({
  declarations: [PanelComponent, CustomInputComponent, PaginationComponent],
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
    HttpClientModule,
    PaginationComponent
  ]
})
export class SharedModule { }
