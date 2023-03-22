import { AfterContentInit, AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { OrderDetail } from 'src/app/models/orderDetail.model';
import { ProductSaleDTO } from 'src/app/models/productSaleDTO.model';
import { SaleDTO } from 'src/app/models/saleDTO.model';
import { SaleDataService } from 'src/app/services/sale-data.service';

@Component({
  selector: 'app-provider-sales-list',
  templateUrl: './provider-sales-list.component.html',
  styleUrls: ['./provider-sales-list.component.css']
})
export class ProviderSalesListComponent implements OnInit, OnDestroy, AfterViewInit {


  orderDetail: OrderDetail[];
  filteredOrders: any;
  sortedData: ProductSaleDTO[];
  
  constructor(private saleDataService : SaleDataService,) {
    
  }

  ngOnInit(): void {
    this.getProvider();
  }

  ngAfterViewInit(): void{
  }

  ngOnDestroy(): void {

  }

  getProvider(): void {
    let id = localStorage.getItem('idProvider');
    console.log(id);
    this.saleDataService.getOrders().subscribe(
      data => {
        this.orderDetail = data;
        // filtrar ventas por id del proveedor
        this.filteredOrders = this.orderDetail.filter(detail => detail.sale.providerId.toString() === id);
        console.log("filtered orders ---->" + JSON.stringify(this.filteredOrders));
      }
    );
  }

  sortData(sort: Sort) {
    const data = this.filteredOrders.product.slice();
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
        default:
          return 0;
      }
    });
  }

}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
