import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Customer } from 'src/app/models/customer.model';
import { ProductSaleDTO } from 'src/app/models/productSaleDTO.model';
import { Provider } from 'src/app/models/provider.model';
import { CustomerDataService } from 'src/app/services/customer-data.service';
import { ProviderDataService } from 'src/app/services/provider-data.service';
import { SaleDataService } from 'src/app/services/sale-data.service';

@Component({
  selector: 'app-sale-create',
  templateUrl: './sale-create.component.html',
  styleUrls: ['./sale-create.component.css']
})
  export class SaleCreateComponent implements OnInit {

    providers: Provider[] = [];
    provider: Provider;
    products: ProductSaleDTO[]=[];
    customers: Customer[] = [];
  
    durationInSeconds = 5;
    createForm: FormGroup;
    createSale: FormGroup;
  
    selectedCustomer: Customer;
    selectedProvider: Provider;
  
    isLinear = false;
  
    constructor(
      private customerDataService: CustomerDataService,
      private providerDataService: ProviderDataService,
      private saleDataService: SaleDataService,
      private fb: FormBuilder,
      private _snackBar: MatSnackBar
    ) {
      this.createAddForm();
    }

    //TODO dar estilo a los inputs de angular material
    //TODO no se tiene que poder ir al siguiente step sin elegir el anterior
  
    ngOnInit(): void {
      this.getProviders();
      this.getCustomers();
    }
  
    createAddForm() {
      this.createForm = this.fb.group({
        provider: ['', [Validators.required]],
        customer: ['', [Validators.required]],
        products: this.fb.array([]),
      });
    }
  
    providerSave() {
      this.selectedProvider = this.createForm.get('provider').value;
    }

    customerSave() {
      this.selectedCustomer = this.createForm.get('customer').value;
    }

    addToCart(newProduct: ProductSaleDTO) {
      let index = this.createForm.value.products.findIndex(prod => prod.id === newProduct.id);
      
      if (index === -1) {
        // El producto no existe en la lista, así que lo agregamos
        this.createForm.value.products.push(newProduct);
        this._snackBar.open("Producto agregado correctamente!", "Cerrar", {
          duration: this.durationInSeconds * 1000
        });
      } else {
        // El producto ya existe en la lista, así que sumamos las cantidades
        let existingProduct = this.createForm.value.products[index];
        existingProduct.quantity += newProduct.quantity;
      }
    }
    
    upQuantity(product : ProductSaleDTO): void{
      if(product.quantity >= 0) {
        product.quantity ++;
      }
    }
  
    downQuantity(product : ProductSaleDTO): void{
      if(product.quantity >= 0) {
        product.quantity --;
      }
    }
  
    getProviders() {
      this.providerDataService.getProviders().subscribe((data) => {
        this.providers = data.filter((data) => data.productList.length > 0);
      });
    }
  
    getCustomers() {
      this.customerDataService.getCustomers().subscribe((data) => {
        console.log(this.customers);
        this.customers = data;
      });
    }

    createSaleRequest(){
      if(this.createForm.valid){
        const saleRequest = {
          providerId: this.createForm.get('provider').value.id,
          customerId: this.createForm.get('customer').value.id,
          products: this.createForm.get('products').value,
        };
        console.log(saleRequest);
        this.saleDataService.createSale(saleRequest).subscribe((res)=> {
          this._snackBar.open("Venta realizada correctamente!", "Cerrar", {
            duration: this.durationInSeconds * 1000
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
      return this.createForm.get['products'] as FormArray;
    };



}
