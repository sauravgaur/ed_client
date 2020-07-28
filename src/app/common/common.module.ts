import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    FormsModule,
    // CustomFormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  declarations: [
  ],
  providers: [

  ],
  exports: [
    FormsModule,
    // CustomFormsModule,
    ReactiveFormsModule,
    RouterModule,
    // AccountSelectComponent,
  ]
})
export class GoCommonModule { }
