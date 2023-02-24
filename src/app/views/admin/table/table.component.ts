import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Customer } from 'src/app/models/customer.model';
import { CustomerWithoutPurchases } from 'src/app/models/customerWithoutPurchases.model';
import { SaleDTO } from 'src/app/models/saleDTO.model';
import { CustomerDataService } from 'src/app/services/customer-data.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})


export class TableComponent implements AfterViewInit, OnInit {
  
  displayedColumns = ['ID', 'Nombre', "Apellido", "DNI", "Direccion", "Telefono", "Compras"];
  dataSource = new MatTableDataSource<Customer>();

  customers: Customer[] = [];
  customerPurchases: SaleDTO[]=[];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Customer>;
  constructor(
    private customerDataService : CustomerDataService,) {
      this.getCustomers();
      this.getPurchasesList();
  }

  ngOnInit(){
    this.getPurchasesList();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  getCustomers(): void {
    this.customerDataService.getCustomers().subscribe(
      data => { 
        this.customers = data;
        this.customerPurchases = data.flatMap(data => this.customerPurchases = data.purchases);
        console.log(this.customerPurchases)
        // const sales: SaleDTO[] = customers.flatMap(customer => customer.purchases);

        this.dataSource.data = data;
        this.dataSource.paginator! = this.paginator;
        this.dataSource.sort! = this.sort;
        console.log(data)
      });
  }

  getPurchasesList(){
      
      this.customers.forEach(customer => { customer.purchases = this.customerPurchases
      console.log(this.customerPurchases);
    });

    
  }


}
