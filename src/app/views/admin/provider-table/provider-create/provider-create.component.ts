import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Provider } from 'src/app/models/provider.model';
import { ProviderDataService } from 'src/app/services/provider-data.service';

@Component({
  selector: 'app-provider-create',
  templateUrl: './provider-create.component.html',
  styleUrls: ['./provider-create.component.css']
})
export class ProviderCreateComponent implements OnInit {

  provider: Provider = new Provider();
  durationInSeconds = 5;
  addForm: FormGroup;
  
  constructor(private providerDataService : ProviderDataService,
              private fb: FormBuilder,
              private _snackBar: MatSnackBar) {

                this.createAddForm();
              }

  ngOnInit(): void {
    this.getProvider();
  }

  getProvider():void{
    let id = localStorage.getItem('idProvider');
    this.providerDataService.getProviderById(+id!).subscribe(
      data => {
        this.provider = data;
      }
    );
  }

  createAddForm(){
    this.addForm = this.fb.group({
      providerName: ['', [Validators.required]],
      providerLastName: ['', [Validators.required]],
      cuit: ['', Validators.required],
      phone: ['', [Validators.required]],
      address: ['', [Validators.required] ],
    })

  }

  addProvider(){
    if(this.addForm.valid){
      const value = this.addForm.value;
      console.log(value);
    this.providerDataService.createProvider(this.addForm.value)
    .subscribe(newProvider => {
      this._snackBar.open("Proveedor Agregado correctamente!", "Cerrar", {
        duration: this.durationInSeconds * 1000,
      });
      });
    } else {
      this._snackBar.open("Error! Faltan datos del Proveedor", "Cerrar", {
        duration: this.durationInSeconds * 1000,
      });
      this.addForm.markAllAsTouched();
    }
  }


    //Form getters
    get providerNameField(){
      return this.addForm.get('providerName')
    };
    get providerLastNameField(){
      return this.addForm.get('providerLastName')
    };
    get cuitField(){
      return this.addForm.get('cuit')
    };
    get phoneField(){
      return this.addForm.get('phone')
    };
    get addressField(){
      return this.addForm.get('address')
    };
}
