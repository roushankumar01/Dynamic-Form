import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApplyFormPage } from './apply-form.page';

const routes: Routes = [
  {
    path: '',
    component: ApplyFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApplyFormPageRoutingModule {}
