import { MaterialModule } from './../../../material-module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewFormListPageRoutingModule } from './view-form-list-routing.module';

import { ViewFormListPage } from './view-form-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaterialModule,
    ViewFormListPageRoutingModule
  ],
  declarations: [ViewFormListPage]
})
export class ViewFormListPageModule {}
