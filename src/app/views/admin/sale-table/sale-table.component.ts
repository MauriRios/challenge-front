import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Sale } from 'src/app/models/sale.model';
import { SaleDTO } from 'src/app/models/saleDTO.model';
import { SaleDataService } from 'src/app/services/sale-data.service';
import { SaleCreateComponent } from './sale-create/sale-create.component';
import { SaleListDialogComponent } from './sale-list-dialog/sale-list-dialog.component';

@Component({
  selector: 'app-sale-table',
  templateUrl: './sale-table.component.html',
  styleUrls: ['./sale-table.component.css']
})
export class SaleTableComponent implements AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  sales: Sale[] = [];
  dataSource = new MatTableDataSource<any>();

  displayedColumns = ['id', 'providerId', 'customerId', 'date', 'quantity', 'totalPrice', 'products'];

  constructor(
    private saleDataService : SaleDataService,
    public dialog: MatDialog
    ) {
  }

  ngOnInit(): void {
    this.getSales();
  }

  ngAfterViewInit(): void {
    
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  getSales(): void {
    this.saleDataService.getSales().subscribe(
      data => { 
        this.sales = data;
        this.dataSource.data = data;
        this.dataSource.paginator! = this.paginator;
        this.dataSource.sort! = this.sort;
      });
  }

  openDialog(sale: SaleDTO): void {
    const dialogRef = this.dialog.open(SaleListDialogComponent);
    localStorage.setItem("idSale", sale.id!.toString());
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
    
  }

  openDialogAdd(): void {
    const dialogRef = this.dialog.open(SaleCreateComponent, {
      width: '320px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
    
  }
}
