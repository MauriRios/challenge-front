import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { CustomerTableComponent } from './customer-table/customer-table.component';
import { PurchasesDialogComponent } from './customer-table/purchases-dialog/purchases-dialog.component';
import { ProviderTableComponent } from './provider-table/provider-table.component';
import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from 'src/app/shared/angular-material/angular-material.module';
import { ViewsModule } from '../views.module';
import { ProductTableComponent } from './product-table/product-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { SaleTableComponent } from './sale-table/sale-table.component';
import { ProductsListDialogComponent } from './provider-table/products-list-dialog/products-list-dialog.component';
import { ProviderEditComponent } from './provider-table/provider-edit/provider-edit.component';
import { ProviderDeleteComponent } from './provider-table/provider-delete/provider-delete.component';
import { ProviderCreateComponent } from './provider-table/provider-create/provider-create.component';
import { ProviderInfoDialogComponent } from './product-table/provider-info-dialog/provider-info-dialog.component';
import { ProductCreateComponent } from './product-table/product-create/product-create.component';
import { ProductEditComponent } from './product-table/product-edit/product-edit.component';
import { ProductDeleteComponent } from './product-table/product-delete/product-delete.component';
import { CustomerDeleteComponent } from './customer-table/customer-delete/customer-delete.component';
import { CustomerCreateComponent } from './customer-table/customer-create/customer-create.component';
import { CustomerEditComponent } from './customer-table/customer-edit/customer-edit.component';
import { SaleCreateComponent } from './sale-table/sale-create/sale-create.component';
import { SaleListDialogComponent } from './sale-table/sale-list-dialog/sale-list-dialog.component';



@NgModule({
  declarations: [    
    NavigationComponent,
    CustomerTableComponent,
    PurchasesDialogComponent,
    ProviderTableComponent,
    ProductTableComponent,
    SaleTableComponent,
    ProductsListDialogComponent,
    ProviderEditComponent,
    ProviderDeleteComponent,
    ProviderCreateComponent,
    ProviderInfoDialogComponent,
    ProductCreateComponent,
    ProductEditComponent,
    ProductDeleteComponent,
    CustomerDeleteComponent,
    CustomerCreateComponent,
    CustomerEditComponent,
    SaleCreateComponent,
    SaleListDialogComponent
  ],  
  exports: [
    NavigationComponent
  ],
  imports: [
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    AdminRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
  ],
  bootstrap: [NavigationComponent]
})
export class AdminModule { }
