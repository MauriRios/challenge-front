import { AfterViewInit, Component, Provider, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProviderDataService } from 'src/app/services/provider-data.service';

@Component({
  selector: 'app-provider-table',
  templateUrl: './provider-table.component.html',
  styleUrls: ['./provider-table.component.css']
})
export class ProviderTableComponent implements AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  providers: Provider[] = [];
  dataSource = new MatTableDataSource<any>();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];

  constructor(
    private providerDataService : ProviderDataService,
    
    ) {
  }

  ngAfterViewInit(): void {
    this.getProviders();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  getProviders(): void {
    this.providerDataService.getProviders().subscribe(
      data => { 
        this.providers = data;
        // this.customerPurchases = data.flatMap(data => this.customerPurchases = data.purchases);
        // console.log(this.customerPurchases)
        // const sales: SaleDTO[] = customers.flatMap(customer => customer.purchases);
        this.dataSource.data = data;
        this.dataSource.paginator! = this.paginator;
        this.dataSource.sort! = this.sort;
        console.log(data)
      });
  }
}
