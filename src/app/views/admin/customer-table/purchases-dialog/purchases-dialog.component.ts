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
  

  getCustomer():void{
    let id = localStorage.getItem('idCustomer');
    this.customerDataService.getCustomerById(+id!).subscribe(
      data => {

        

        this.customer = data;
        console.log(this.customer)

      }
    );
  }



}


