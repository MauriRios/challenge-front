import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from 'src/app/models/product.model';
import { Provider } from 'src/app/models/provider.model';
import { ProductDataService } from 'src/app/services/product-data.service';
import { ProviderDataService } from 'src/app/services/provider-data.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  product: Product = new Product();
  providers: Provider[]=[];
  editForm!: FormGroup;
  durationInSeconds = 5;

  constructor(private productDataService : ProductDataService,
              private providerDataService : ProviderDataService, 
              private fb: FormBuilder,
              private _snackBar: MatSnackBar
              ) { 
                this.createEditForm();
              }
              
    ngOnInit(): void {
                this.getProduct();
                this.getProviders();
                
    }

  createEditForm(){
    this.editForm = this.fb.group({

      provider: ['', [Validators.required]],
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: ['', Validators.required],
      stock: ['', [Validators.required]],
      
    })

  }

  getProduct():void{
    let id = localStorage.getItem('idProduct');
    this.productDataService.getProductById(+id!).subscribe(
      data => {
        this.product = data;

      }
    );
  }

  getProviders(){
    this.providerDataService.getProviders()
    .subscribe( 
      data => this.providers = data,
      )
    
  }

  updateProduct(){
    let id = localStorage.getItem('idProduct');
    this.editForm.value.id = id;
    if(this.editForm.valid){
    this.productDataService.updateProduct(this.editForm.value.id, this.editForm.value)
      .subscribe((res) => {
        console.log(res);
        this._snackBar.open("Producto editado correctamente!", "Cerrar", {
          duration: this.durationInSeconds * 1000,
        });
        console.log(this.editForm);
      });
      } else {
        this._snackBar.open("Error, Faltan datos del Producto", "Cerrar", {
          duration: this.durationInSeconds * 1000,
      })
    }
  }

    //Form getters
    get providerField(){
      return this.editForm.get('provider')
    };
    get nameField(){
      return this.editForm.get('name')
    };
    get descriptionField(){
      return this.editForm.get('description')
    };
    get priceField(){
      return this.editForm.get('price')
    };
    get stockField(){
      return this.editForm.get('stock')
    };
}
