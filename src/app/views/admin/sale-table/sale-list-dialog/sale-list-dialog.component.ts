import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { OrderDetail } from 'src/app/models/orderDetail.model';
import { ProductSaleDTO } from 'src/app/models/productSaleDTO.model';
import { SaleDataService } from 'src/app/services/sale-data.service';

@Component({
  selector: 'app-sale-list-dialog',
  templateUrl: './sale-list-dialog.component.html',
  styleUrls: ['./sale-list-dialog.component.css']
})
export class SaleListDialogComponent implements OnInit, AfterViewInit {

  productList: ProductSaleDTO[] = [];
  orderDetail: OrderDetail[]=[];
  sortedData: ProductSaleDTO[];

  constructor(private saleDataService : SaleDataService,) {
  }

  ngOnInit(): void {
    this.getOrderDetail();

  }
  ngAfterViewInit(): void {
    this.getOrderDetail();
  }

  getOrderDetail(): void {
    const id = localStorage.getItem('idSale');
    this.saleDataService.getOrders().subscribe(orderDetail => {
        this.orderDetail = orderDetail;
        const saleDetail = orderDetail.filter(detail => detail.sale.id.toString() === id)[0];
      
        this.productList = saleDetail.product.map(data => data);
        this.sortedData = this.productList.slice();
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
            return compare(a.name, b.name, isAsc);
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