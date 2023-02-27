import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerTableComponent } from './views/admin/customer-table/customer-table.component';
import { NavigationComponent } from './views/admin/navigation.component';
import { ProviderTableComponent } from './views/admin/provider-table/provider-table.component';

export const routes: Routes = [

  { path: 'admin', loadChildren: () => import('./views/admin/admin.module').then(m => m.AdminModule) },

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
