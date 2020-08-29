import { AddNewTabDialogComponent } from './../add-new-tab-dialog/add-new-tab-dialog.component';
import { AddNewFieldDialogComponent } from './../add-new-field-dialog/add-new-field-dialog.component';
import { MaterialModule } from './../../../material-module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddOrEditFieldsPageRoutingModule } from './add-or-edit-fields-routing.module';

import { AddOrEditFieldsPage } from './add-or-edit-fields.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaterialModule,
    ReactiveFormsModule,
    AddOrEditFieldsPageRoutingModule
  ],
  declarations: [AddOrEditFieldsPage, AddNewFieldDialogComponent, AddNewTabDialogComponent],
  entryComponents: [AddNewFieldDialogComponent, AddNewTabDialogComponent]
})
export class AddOrEditFieldsPageModule {}
