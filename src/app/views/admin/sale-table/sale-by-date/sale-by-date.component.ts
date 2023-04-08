import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { SaleDTO } from 'src/app/models/saleDTO.model';
import { SaleDataService } from 'src/app/services/sale-data.service';

@Component({
  selector: 'app-sale-by-date',
  templateUrl: './sale-by-date.component.html',
  styleUrls: ['./sale-by-date.component.css']
})
export class SaleByDateComponent implements OnInit {

  sales: SaleDTO[];

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

}
