import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Provider } from 'src/app/models/provider.model';
import { ProviderDataService } from 'src/app/services/provider-data.service';
import { ProductsListDialogComponent } from './products-list-dialog/products-list-dialog.component';
import { ProviderCreateComponent } from './provider-create/provider-create.component';
import { ProviderDeleteComponent } from './provider-delete/provider-delete.component';
import { ProviderEditComponent } from './provider-edit/provider-edit.component';
import { ProviderSalesListComponent } from './provider-sales-list/provider-sales-list.component';

@Component({
  selector: 'app-provider-table',
  templateUrl: './provider-table.component.html',
  styleUrls: ['./provider-table.component.css']
})
export class ProviderTableComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  subscription!: Subscription; 
  
  providers: Provider[] = [];
  dataSource = new MatTableDataSource<any>();

  displayedColumns = ['id', 'name', 'lastName', 'cuit', 'phone', 'address', 'products', 'saleList', 'acciones', 'status'];
  isChecked: boolean;
  providerId: number;

  constructor(
    private providerDataService : ProviderDataService,
    public dialog: MatDialog
    ) {
  }

  ngOnInit(): void {
    this.getProviders();

    this.subscription = this.providerDataService.refresh$.subscribe(() => {
      this.getProviders();
    })
  }

  ngAfterViewInit(): void {
    
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  toggleProvider(providerId: number, providerStatus: boolean) {
    this.providerDataService.toggleProvider(providerId, providerStatus)
    .subscribe(res => {
      console.log(res);
    });
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
      localStorage.removeItem("idProvider");
      console.log('The dialog was closed');
    });
    
  }

  openSalesDialog(provider: Provider): void {
    const dialogRef = this.dialog.open(ProviderSalesListComponent);
    localStorage.setItem("idProvider", provider.id!.toString());
    dialogRef.afterClosed().subscribe(result => {
      localStorage.removeItem("idProvider");
      console.log('The dialog was closed');
    });
    
  }

  openDialogEdit(provider: Provider): void {
    const dialogRef = this.dialog.open(ProviderEditComponent, {
      width: '320px',
    });
    localStorage.setItem("idProvider", provider.id!.toString());
    dialogRef.afterClosed().subscribe(result => {
      localStorage.removeItem("idProvider");
      console.log('The dialog was closed');
    });
    
  }

  openDialogDelete(provider: Provider): void {
    const dialogRef = this.dialog.open(ProviderDeleteComponent, {
      width: '320px',
    });
    localStorage.setItem("idProvider", provider.id!.toString());
    dialogRef.afterClosed().subscribe(result => {
      localStorage.removeItem("idProvider");
      console.log('The dialog was closed');
    });
    
  }

  openDialogAdd(): void {
    const dialogRef = this.dialog.open(ProviderCreateComponent, {
      width: '320px',
    });
    dialogRef.afterClosed().subscribe(result => {
      localStorage.removeItem("idProvider");
      console.log('The dialog was closed');
    });
    
  }

}
