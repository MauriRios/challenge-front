import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerTableComponent } from './customer-table/customer-table.component';
import { NavigationComponent } from './navigation.component';
import { ProductTableComponent } from './product-table/product-table.component';
import { ProviderTableComponent } from './provider-table/provider-table.component';
import { SaleTableComponent } from './sale-table/sale-table.component';



export const routesA: Routes = [

  {
    path: '',
    redirectTo: 'admin/clientes',
    pathMatch: 'full'
  },

  {path: 'admin', component: NavigationComponent, children:[
    {path: 'clientes', component: CustomerTableComponent},
    {path: 'proveedores', component: ProviderTableComponent},
    {path: 'productos', component: ProductTableComponent},
    {path: 'ventas', component: SaleTableComponent},

  ]},

];


@NgModule({
  imports: [RouterModule.forChild(routesA)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
