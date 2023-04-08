import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Sort } from '@angular/material/sort';
import { ProductSaleDTO } from 'src/app/models/productSaleDTO.model';
import { SaleDataService } from 'src/app/services/sale-data.service';

@Component({
  selector: 'app-sale-by-date',
  templateUrl: './sale-by-date.component.html',
  styleUrls: ['./sale-by-date.component.css']
})
export class SaleByDateComponent implements OnInit {

  sales: any;
  sortedData: ProductSaleDTO[];

  constructor(
    private saleDataService: SaleDataService,
    private datePipe: DatePipe,
    ) { }

  ngOnInit(): void {
  }

  onDateSelected(event: MatDatepickerInputEvent<Date>): void {
    const formattedDate = this.datePipe.transform(event.value, 'yyyy/MM/dd');
    const dateObject = new Date(formattedDate);
    this.saleDataService.findSaleByDate(dateObject)
      .subscribe(res => {
        this.sales = res,
        console.log(res)
      });
      
      
  }

  sortData(sort: Sort) {
    const data = this.sales.products.slice();
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
