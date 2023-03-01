import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Provider } from 'src/app/models/provider.model';
import { ProviderDataService } from 'src/app/services/provider-data.service';
import { ProductsListDialogComponent } from './products-list-dialog/products-list-dialog.component';
import { ProviderEditComponent } from './provider-edit/provider-edit.component';

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

  displayedColumns = ['id', 'name', 'lastName', 'cuit', 'phone', 'address', 'status', 'products', 'saleList', 'acciones'];

  constructor(
    private providerDataService : ProviderDataService,
    public dialog: MatDialog
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
        this.dataSource.data = data;
        this.dataSource.paginator! = this.paginator;
        this.dataSource.sort! = this.sort;
      });
  }

  openDialog(provider: Provider): void {
    const dialogRef = this.dialog.open(ProductsListDialogComponent);
    localStorage.setItem("idProvider", provider.id!.toString());
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
    
  }

  openDialogEdit(provider: Provider): void {
    const dialogRef = this.dialog.open(ProviderEditComponent, {
      width: '320px',
    });
    localStorage.setItem("idProvider", provider.id!.toString());
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
    
  }

}
