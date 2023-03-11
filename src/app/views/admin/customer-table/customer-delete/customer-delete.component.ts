import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Customer } from 'src/app/models/customer.model';
import { CustomerDataService } from 'src/app/services/customer-data.service';

@Component({
  selector: 'app-customer-delete',
  templateUrl: './customer-delete.component.html',
  styleUrls: ['./customer-delete.component.css']
})
export class CustomerDeleteComponent implements OnInit {

 
  customer: Customer = new Customer();
  durationInSeconds = 5;
  constructor(private customerDataService : CustomerDataService,
              private _snackBar: MatSnackBar
              ) { }

  ngOnInit(): void {
    this.getCustomer();
  }

  getCustomer():void{
    let id = localStorage.getItem('idCustomer');
    this.customerDataService.getCustomerById(+id!).subscribe(
      data => {
        this.customer = data;
        console.log(data);
      }
    );
  }

  deleteCustomer():void{
    this.customerDataService.deleteCustomer(this.customer.id).subscribe(
      data => {
        this._snackBar.open("Cliente Eliminado correctamente!", "Cerrar", {
          duration: this.durationInSeconds * 1000,
        });
      }
    );
    }
}
