import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { ProductProviderDTO } from 'src/app/models/productProviderDTO';
import { Provider } from 'src/app/models/provider.model';
import { ProductDataService } from 'src/app/services/product-data.service';
import { ProviderDataService } from 'src/app/services/provider-data.service';
import { ProductCreateComponent } from './product-create/product-create.component';
import { ProductDeleteComponent } from './product-delete/product-delete.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProviderInfoDialogComponent } from './provider-info-dialog/provider-info-dialog.component';
import { ProductLowStockComponent } from './product-low-stock/product-low-stock.component';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.css']
})
export class ProductTableComponent implements OnInit, AfterViewInit, OnDestroy {
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  subscription!: Subscription; 

  products: Product[] = [];
  provider: Provider = new Provider();
  dataSource = new MatTableDataSource<any>();

  displayedColumns = ['id', 'name', 'description', 'price', 'stock', 'provider', 'acciones', 'status'];
  isChecked: boolean;
  productId: number;

  constructor(
    private productDataService : ProductDataService,
    public dialog: MatDialog
    ) {
  }
  ngOnInit(): void {
    this.getProducts();

    this.subscription = this.productDataService.refresh$.subscribe(() => {
      this.getProducts();
    })
    
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  toggleProduct(productId: number, productStatus: boolean) {
    this.productDataService.toggleProduct(productId, productStatus)
    .subscribe((response) => {
      console.log(response);
    });
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
    const dialogRef = this.dialog.open(ProviderInfoDialogComponent, {
      minWidth: '320px',
      maxWidth: '640px',
    });
    console.log(productProviderDTO)
    localStorage.setItem("idProvider", productProviderDTO.provideId.toString());
    dialogRef.afterClosed().subscribe(result => {
      localStorage.removeItem("idProvider");
      console.log('The dialog was closed');
    });
    
  }

  openDialogEdit(product: Product): void {
    const dialogRef = this.dialog.open(ProductEditComponent, {
      minWidth: '320px',
      maxWidth: '640px',
    });
    localStorage.setItem("idProduct", product.id!.toString());
    dialogRef.afterClosed().subscribe(result => {
      localStorage.removeItem("idProvider");
      console.log('The dialog was closed');
    });
    
  }

  openDialogDelete(product: Product): void {
    const dialogRef = this.dialog.open(ProductDeleteComponent, {
      minWidth: '320px',
      maxWidth: '640px',
    });
    localStorage.setItem("idProduct", product.id!.toString());
    dialogRef.afterClosed().subscribe(result => {
      localStorage.removeItem("idProvider");
      console.log('The dialog was closed');
    });
    
  }

  openDialogAdd(): void {
    const dialogRef = this.dialog.open(ProductCreateComponent, {
      minWidth: '320px',
      maxWidth: '640px',
    });
    dialogRef.afterClosed().subscribe(result => {
      localStorage.removeItem("idProvider");
      console.log('The dialog was closed');
    });
    
  }

  openLowStock(){
    const dialogRef = this.dialog.open(ProductLowStockComponent, {
      minWidth: '320px',
      maxWidth: '640px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
    
  }

}
