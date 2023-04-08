import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';

//components
import { NavigationComponent } from './views/admin/navigation.component';

//angular material
import { AngularMaterialModule } from './shared/angular-material/angular-material.module';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { PurchasesDialogComponent } from './views/admin/customer-table/purchases-dialog/purchases-dialog.component';
import { CustomerTableComponent } from './views/admin/customer-table/customer-table.component';
import { ProviderTableComponent } from './views/admin/provider-table/provider-table.component';
import { ViewsModule } from './views/views.module';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ViewsModule,
    AppRoutingModule,

  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
