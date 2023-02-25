import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer.model';
import { CustomerDataService } from 'src/app/services/customer-data.service';


@Component({
  selector: 'app-purchases-dialog',
  templateUrl: './purchases-dialog.component.html',
  styleUrls: ['./purchases-dialog.component.css']
})
export class PurchasesDialogComponent implements OnInit {

  customer!: Customer;
  displayedColumns = ['productName', 'description', 'quantity', 'price'];

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
        // this.customerPurchases.forEach(data => this.sortData)
        
        // console.trace("productoslista " + this.productsList)
         // this.customerPurchases = data.flatMap(data => this.customerPurchases = data.purchases);
        // console.log(this.customerPurchases)

      }
    );
  }

  // sortData(sort: Sort) {
  //   const data = this.products.slice();
  //   if (!sort.active || sort.direction === '') {
  //     this.sortedData = data;
  //     return;
  //   }

  //   this.sortedData = data.sort((a, b) => {
  //     const isAsc = sort.direction === 'asc';
  //     switch (sort.active) {
  //       case 'name':
  //         return compare(a.productName, b.productName, isAsc);
  //       case 'calories':
  //         return compare(a.description, b.description, isAsc);
  //       case 'fat':
  //         return compare(a.price, b.price, isAsc);
  //       case 'carbs':
  //         return compare(a.quantity, b.quantity, isAsc);
  //       default:
  //         return 0;
  //     }
  //   });
  // }

}

// function compare(a: number | string, b: number | string, isAsc: boolean) {
//   return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
// }

