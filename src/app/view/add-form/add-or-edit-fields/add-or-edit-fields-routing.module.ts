import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddOrEditFieldsPage } from './add-or-edit-fields.page';

const routes: Routes = [
  {
    path: '',
    component: AddOrEditFieldsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddOrEditFieldsPageRoutingModule {}
