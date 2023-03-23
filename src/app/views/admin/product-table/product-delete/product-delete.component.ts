import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from 'src/app/models/product.model';
import { ProductDataService } from 'src/app/services/product-data.service';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {

  product: Product = new Product();
  durationInSeconds = 5;
  constructor(private productDataService : ProductDataService,
              private _snackBar: MatSnackBar
              ) { }

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct():void{
    let id = localStorage.getItem('idProduct');
    this.productDataService.getProductById(+id!).subscribe(
      data => {
        this.product = data;
      }
    );
  }

  deleteProduct():void{
    this.productDataService.deleteProduct(this.product.id).subscribe(
      res => {
        console.log(res);
        this._snackBar.open("Producto Eliminado correctamente!", "Cerrar", {
          duration: this.durationInSeconds * 1000,
        });
      }
    );
    }

}
