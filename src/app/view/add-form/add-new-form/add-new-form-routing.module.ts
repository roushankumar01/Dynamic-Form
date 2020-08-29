import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddNewFormPage } from './add-new-form.page';

const routes: Routes = [
  {
    path: '',
    component: AddNewFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddNewFormPageRoutingModule {}
