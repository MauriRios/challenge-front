import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { Product } from 'src/app/models/product.model';
import { ProductSaleDTO } from 'src/app/models/productSaleDTO.model';
import { SaleDTO } from 'src/app/models/saleDTO.model';
import { SaleDataService } from 'src/app/services/sale-data.service';

@Component({
  selector: 'app-sale-list-dialog',
  templateUrl: './sale-list-dialog.component.html',
  styleUrls: ['./sale-list-dialog.component.css']
})
export class SaleListDialogComponent implements OnInit {

  productList: ProductSaleDTO[] = [];
  sale: SaleDTO;
  sortedData: ProductSaleDTO[];

  constructor(private saleDataService : SaleDataService,) {
  }

  ngOnInit(): void {
    this.getSale();

  }
  ngAfterViewInit(): void {
    this.getSale();
  }

  getSale():void{
    let id = localStorage.getItem('idSale');
    this.saleDataService.getSaleById(+id!).subscribe(
      data => {
        this.sale = data;
        this.productList = this.sale.products.map( data => data );
        this.sortedData = this.productList.slice();
        console.log(this.productList)
      }
    );
  }

  sortData(sort: Sort) {
    const data = this.productList.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id':
          return compare(a.id, b.id, isAsc);
          case 'name':
            return compare(a.productName, b.productName, isAsc);
        case 'description':
          return compare(a.description, b.description, isAsc);
        case 'price':
          return compare(a.price, b.price, isAsc);
        case 'stock':
          return compare(a.quantity, b.quantity, isAsc);
        default:
          return 0;
      }
    });
}


}

function compare(a: number | string, b: number | string, isAsc: boolean) {
return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
