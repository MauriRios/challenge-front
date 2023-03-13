import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Customer } from 'src/app/models/customer.model';
import { Product } from 'src/app/models/product.model';
import { Provider } from 'src/app/models/provider.model';
import { CustomerDataService } from 'src/app/services/customer-data.service';
import { ProductDataService } from 'src/app/services/product-data.service';
import { ProviderDataService } from 'src/app/services/provider-data.service';

@Component({
  selector: 'app-sale-create',
  templateUrl: './sale-create.component.html',
  styleUrls: ['./sale-create.component.css']
})
export class SaleCreateComponent implements OnInit {

  
  products: Product[]=[];
  providers: Provider[] = [];
  customers: Customer[] = [];
  durationInSeconds = 5;
  createForm: FormGroup;
  selectedProducts: Product[] = [];
  
  constructor(private productDataService : ProductDataService,
              private customerDataService : CustomerDataService, 
              private providerDataService : ProviderDataService, 
              private fb: FormBuilder,
              private _snackBar: MatSnackBar) {

                this.createAddForm();
              }

  ngOnInit(): void {
    this.getProviders();
    this.getCustomers();
    this.getProducts();
  }


  createAddForm(){
    this.createForm = this.fb.group({
      
      provider: ['', [Validators.required]],
      customer: ['', [Validators.required]],
      products: ['', [Validators.required]],

    })

  }

  getProviders(){
    this.providerDataService.getProviders()
    .subscribe( data => this.providers = data)
    console.log(this.providers)
  }
  getCustomers(){
    this.customerDataService.getCustomers()
    .subscribe( data => this.customers = data)
    console.log(this.customers)
  }

  getProducts(){
    this.productDataService.getProducts()
    .subscribe( data => this.products = data)
    console.log(this.products)
  }

  saveSelectedProducts() {
    this.selectedProducts = this.products.filter(product => product.quantity > 0);
    console.log(this.selectedProducts); // Se imprime en consola la lista de productos seleccionados
  }

  createSale(){
    if(this.createForm.valid){
      const value = this.createForm.value;
      console.log(value);
    this.productDataService.createProduct(this.createForm.value)
    .subscribe(newProduct => {
      this._snackBar.open("Venta realizada correctamente!", "Cerrar", {
        duration: this.durationInSeconds * 1000,
      });
      });
    } else {
      this._snackBar.open("Error! Faltan datos para la venta", "Cerrar", {
        duration: this.durationInSeconds * 1000,
      });
      this.createForm.markAllAsTouched();
    }
  }


    //Form getters
    get providerField(){
      return this.createForm.get('provider')
    };
    get customerField(){
      return this.createForm.get('customer')
    };
    get productsField(){
      return this.createForm.get('products')
    };



}
