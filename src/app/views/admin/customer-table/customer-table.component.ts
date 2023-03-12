import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Customer } from 'src/app/models/customer.model';
import { CustomerDataService } from 'src/app/services/customer-data.service';
import { CustomerCreateComponent } from './customer-create/customer-create.component';
import { CustomerDeleteComponent } from './customer-delete/customer-delete.component';
import { CustomerEditComponent } from './customer-edit/customer-edit.component';
import { PurchasesDialogComponent } from './purchases-dialog/purchases-dialog.component';

@Component({
  selector: 'app-customer-table',
  templateUrl: './customer-table.component.html',
  styleUrls: ['./customer-table.component.css']
})


export class CustomerTableComponent implements AfterViewInit, OnInit {
  
  displayedColumns: string [] = ['ID', 'Nombre', "Apellido", "DNI", "Direccion", "Telefono", "Compras", "Acciones", 'Status'];
  dataSource = new MatTableDataSource<any>();

  customers: Customer[] = [];
  isChecked: boolean;
  customerId: number;

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
        this.dataSource.data = data;
        this.dataSource.paginator! = this.paginator;
        this.dataSource.sort! = this.sort;
        console.log(data)
      });
  }

  toggleCustomer(customerId: number, customerStatus: boolean) {
    this.customerDataService.toggleCustomer(customerId, customerStatus)
    .subscribe((response) => {
      console.log(response);
    });
  }

  openDialog(customer: Customer): void {
    const dialogRef = this.dialog.open(PurchasesDialogComponent);
    localStorage.setItem("idCustomer", customer.id!.toString());
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openDialogEdit(customer: Customer): void {
    const dialogRef = this.dialog.open(CustomerEditComponent, {
      width: '320px',
    });
    localStorage.setItem("idCustomer", customer.id!.toString());
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
    
  }

  openDialogDelete(customer: Customer): void {
    const dialogRef = this.dialog.open(CustomerDeleteComponent, {
      width: '320px',
    });
    localStorage.setItem("idCustomer", customer.id!.toString());
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openDialogAdd(): void {
    const dialogRef = this.dialog.open(CustomerCreateComponent, {
      width: '320px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
    
  }



}
