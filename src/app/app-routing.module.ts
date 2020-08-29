import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'view-form-list',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'apply-form/:form_id',
    loadChildren: () => import('./view/apply-form/apply-form/apply-form.module').then( m => m.ApplyFormPageModule)
  },
  {
    path: 'view-form-list',
    loadChildren: () => import('./view/add-form/view-form-list/view-form-list.module').then( m => m.ViewFormListPageModule)
  },
  {
    path: 'add-new-form',
    loadChildren: () => import('./view/add-form/add-new-form/add-new-form.module').then( m => m.AddNewFormPageModule)
  },
  {
    path: 'add-or-edit-fields/:form_id',
    loadChildren: () => import('./view/add-form/add-or-edit-fields/add-or-edit-fields.module').then( m => m.AddOrEditFieldsPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
