import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { Product } from 'src/app/models/product.model';
import { ProductDataService } from 'src/app/services/product-data.service';

@Component({
  selector: 'app-product-low-stock',
  templateUrl: './product-low-stock.component.html',
  styleUrls: ['./product-low-stock.component.css']
})
export class ProductLowStockComponent implements OnInit {

  sort: number;
  sortedProducts: Product[]=[];
  sortedData: Product[];
  
  constructor(
    private productDataService : ProductDataService,

  ) { }

  ngOnInit(): void {

  }

  getProducts() {
    const stock = this.sort;
    this.productDataService.getProductsByLowStock(stock)
    .subscribe(response =>{
      this.sortedProducts = response;
      console.log(response);
      this.sortedData = this.sortedProducts.slice();

    })
  }

  sortData(sort: Sort) {
    const data = this.sortedProducts.slice();
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
            return compare(a.name, b.name, isAsc);
        case 'description':
          return compare(a.description, b.description, isAsc);
        case 'price':
          return compare(a.price, b.price, isAsc);
        case 'stock':
          return compare(a.stock, b.stock, isAsc);
        default:
          return 0;
      }
    });
  }

}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
