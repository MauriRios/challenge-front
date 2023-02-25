import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Customer } from 'src/app/models/customer.model';
import { CustomerDataService } from 'src/app/services/customer-data.service';
import { PurchasesDialogComponent } from './purchases-dialog/purchases-dialog.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})


export class TableComponent implements AfterViewInit, OnInit {
  
  displayedColumns: string [] = ['ID', 'Nombre', "Apellido", "DNI", "Direccion", "Telefono", "Compras"];
  dataSource = new MatTableDataSource<any>();

  customers: Customer[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private customerDataService : CustomerDataService,
    public dialog: MatDialog) {
      this.getCustomers();
  }


  ngOnInit(){
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  getCustomers(): void {
    this.customerDataService.getCustomers().subscribe(
      data => { 
        this.customers = data;
        // this.customerPurchases = data.flatMap(data => this.customerPurchases = data.purchases);
        // console.log(this.customerPurchases)
        // const sales: SaleDTO[] = customers.flatMap(customer => customer.purchases);

        this.dataSource.data = data;
        this.dataSource.paginator! = this.paginator;
        this.dataSource.sort! = this.sort;
        console.log(data)
      });
  }

  // openDialog() {
  //   const dialogRef = this.dialog.open(PurchasesDialogComponent);
  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log(`Dialog result: ${result}`);
  //   });
  // }

  openDialog(customer: Customer): void {
    const dialogRef = this.dialog.open(PurchasesDialogComponent);
    localStorage.setItem("idCustomer", customer.id!.toString());
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
    
  }



}
