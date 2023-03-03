import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/app/models/product.model';
import { ProductProviderDTO } from 'src/app/models/productProviderDTO';
import { Provider } from 'src/app/models/provider.model';
import { ProductDataService } from 'src/app/services/product-data.service';
import { ProviderDataService } from 'src/app/services/provider-data.service';
import { ProviderInfoDialogComponent } from './provider-info-dialog/provider-info-dialog.component';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.css']
})
export class ProductTableComponent implements AfterViewInit, OnInit {
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  products: Product[] = [];
  provider: Provider = new Provider();
  dataSource = new MatTableDataSource<any>();

  displayedColumns = ['id', 'name', 'description', 'price', 'stock', 'status', 'provider', 'acciones'];

  constructor(
    private productDataService : ProductDataService,
    private providerDataService : ProviderDataService,
    public dialog: MatDialog
    ) {
  }
  ngOnInit(): void {
    this.getProducts();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  getProducts(): void {
    this.productDataService.getProducts().subscribe(
      data => { 
        this.products = data;
        this.dataSource.data = data;
        this.dataSource.paginator! = this.paginator;
        this.dataSource.sort! = this.sort;
        
      });
  }

  openDialog(productProviderDTO: ProductProviderDTO): void {
    const dialogRef = this.dialog.open(ProviderInfoDialogComponent);
    console.log(productProviderDTO)
    localStorage.setItem("idProvider", productProviderDTO.provideId.toString());
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
    
  }

  // openDialogEdit(provider: Provider): void {
  //   const dialogRef = this.dialog.open(ProviderEditComponent, {
  //     width: '320px',
  //   });
  //   localStorage.setItem("idProvider", provider.id!.toString());
  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');
  //   });
    
  // }

  // openDialogDelete(provider: Provider): void {
  //   const dialogRef = this.dialog.open(ProviderDeleteComponent, {
  //     width: '320px',
  //   });
  //   localStorage.setItem("idProvider", provider.id!.toString());
  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');
  //   });
    
  // }

  // openDialogAdd(): void {
  //   const dialogRef = this.dialog.open(ProviderCreateComponent, {
  //     width: '320px',
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');
  //   });
    
  // }

}
