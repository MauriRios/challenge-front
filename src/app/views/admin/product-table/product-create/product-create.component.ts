import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from 'src/app/models/product.model';
import { Provider } from 'src/app/models/provider.model';
import { ProductDataService } from 'src/app/services/product-data.service';
import { ProviderDataService } from 'src/app/services/provider-data.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  product: Product = new Product();
  providers: Provider[] = [];
  durationInSeconds = 5;
  addForm: FormGroup;
  
  constructor(private productDataService : ProductDataService,
              private providerDataService : ProviderDataService, 
              private fb: FormBuilder,
              private _snackBar: MatSnackBar) {

                this.createAddForm();
              }

  ngOnInit(): void {
    this.getProviders();
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

  getProviders(){
    this.providerDataService.getProviders()
    .subscribe( data => this.providers = data)
  }

  addProvider(){
    if(this.addForm.valid){
    this.productDataService.createProduct(this.addForm.value)
    .subscribe(res => {
      console.log(res);
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
