import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from 'src/app/models/product.model';
import { ProductDataService } from 'src/app/services/product-data.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  product: Product = new Product();
  durationInSeconds = 5;
  addForm: FormGroup;
  
  constructor(private productDataService : ProductDataService,
              private fb: FormBuilder,
              private _snackBar: MatSnackBar) {

                this.createAddForm();
              }

  ngOnInit(): void {

  }


  createAddForm(){
    this.addForm = this.fb.group({
      
      provider: ['', [Validators.required]],
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: ['', Validators.required],
      stock: ['', [Validators.required]],
      
    })

  }

  addProvider(){
    if(this.addForm.valid){
      const value = this.addForm.value;
      console.log(value);
    this.productDataService.createProduct(this.addForm.value)
    .subscribe(newProduct => {
      this._snackBar.open("Producto Agregado correctamente!", "Cerrar", {
        duration: this.durationInSeconds * 1000,
      });
      });
    } else {
      this._snackBar.open("Error! Faltan datos del Producto", "Cerrar", {
        duration: this.durationInSeconds * 1000,
      });
      this.addForm.markAllAsTouched();
    }
  }


    //Form getters
    get providerField(){
      return this.addForm.get('provider')
    };
    get nameField(){
      return this.addForm.get('name')
    };
    get descriptionField(){
      return this.addForm.get('description')
    };
    get priceField(){
      return this.addForm.get('price')
    };
    get stockField(){
      return this.addForm.get('stock')
    };

}
