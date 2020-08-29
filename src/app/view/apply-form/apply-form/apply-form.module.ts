import { MaterialModule } from './../../../material-module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ApplyFormPageRoutingModule } from './apply-form-routing.module';

import { ApplyFormPage } from './apply-form.page';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
@NgModule({
  imports: [

    ReactiveFormsModule,

    MaterialModule,
    NgxMaterialTimepickerModule,

    //
    CommonModule,
    FormsModule,
    IonicModule,
    ApplyFormPageRoutingModule
  ],
  declarations: [ApplyFormPage]
})
export class ApplyFormPageModule {}
