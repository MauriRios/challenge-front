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
  phonePattern = /^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/ ;
  cuitPattern = /^\d{11}$/;

  
  constructor(private providerDataService : ProviderDataService,
              private fb: FormBuilder,
              private _snackBar: MatSnackBar) {
                this.createAddForm();
              }

  ngOnInit(): void {

  }

  createAddForm(){
    this.addForm = this.fb.group({
      providerName: ['', [Validators.required]],
      providerLastName: ['', [Validators.required]],
      cuit: ['', Validators.required, Validators.pattern(this.cuitPattern)],
      phone: ['', [Validators.required, Validators.pattern(this.phonePattern)]],
      address: ['', [Validators.required] ],
    })

  }

  addProvider(){
    if(this.addForm.valid){
    this.providerDataService.createProvider(this.addForm.value)
    .subscribe(res => {
      console.log(res);
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
