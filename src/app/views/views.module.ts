//Angular modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

//Views
import { AdminModule } from './admin/admin.module';
import { AdminRoutingModule } from './admin/admin-routing.module';




@NgModule({
  declarations: [
    
  ],
  exports: [
    AdminModule,

  ],
  imports: [
    CommonModule,
    HttpClientModule,
    AdminModule,
    AdminRoutingModule,

  ],
  providers: [
    
  ]
})
export class ViewsModule { }
