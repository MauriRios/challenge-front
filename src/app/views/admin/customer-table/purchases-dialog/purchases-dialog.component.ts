import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer.model';
import { CustomerDataService } from 'src/app/services/customer-data.service';


@Component({
  selector: 'app-purchases-dialog',
  templateUrl: './purchases-dialog.component.html',
  styleUrls: ['./purchases-dialog.component.css']
})
export class PurchasesDialogComponent implements OnInit {

  customer: Customer = new Customer();

  constructor(private customerDataService : CustomerDataService,

    ) {
      
    }

  ngOnInit(): void {
    this.getCustomer();
  }
  
  //TODO arreglar la funcion para que no se repitan las compras
  //TODO con el mismo id, obtene las compras desde la orden y no desde customer
  getCustomer():void{
    let id = localStorage.getItem('idCustomer');
    this.customerDataService.getCustomerById(+id!).subscribe(
      data => {
        this.customer = data;
      }
    );
  }



}


