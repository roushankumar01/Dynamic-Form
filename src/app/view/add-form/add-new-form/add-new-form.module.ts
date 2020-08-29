import { MaterialModule } from './../../../material-module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddNewFormPageRoutingModule } from './add-new-form-routing.module';

import { AddNewFormPage } from './add-new-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaterialModule,
    ReactiveFormsModule,
    AddNewFormPageRoutingModule
  ],
  declarations: [AddNewFormPage]
})
export class AddNewFormPageModule {}
