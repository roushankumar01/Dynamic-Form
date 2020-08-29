import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewFormListPage } from './view-form-list.page';

const routes: Routes = [
  {
    path: '',
    component: ViewFormListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewFormListPageRoutingModule {}
