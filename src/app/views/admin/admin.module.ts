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



@NgModule({
  declarations: [    
    NavigationComponent,
    CustomerTableComponent,
    PurchasesDialogComponent,
    ProviderTableComponent,
    ProductTableComponent,
    SaleTableComponent,
    ProductsListDialogComponent
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
