import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Provider } from 'src/app/models/provider.model';
import { ProviderDataService } from 'src/app/services/provider-data.service';

@Component({
  selector: 'app-provider-edit',
  templateUrl: './provider-edit.component.html',
  styleUrls: ['./provider-edit.component.css']
})
export class ProviderEditComponent implements OnInit {

  provider: Provider = new Provider();
  editForm!: FormGroup;
  durationInSeconds = 5;

  constructor(private providerDataService : ProviderDataService,
              private fb: FormBuilder,
              private _snackBar: MatSnackBar
              ) { 
                this.createEditForm();
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

  createEditForm(){
    this.editForm = this.fb.group({
      id: [''],
      providerName: ['', [Validators.required]],
      providerLastName: ['', [Validators.required]],
      cuit: ['', Validators.required],
      phone: ['', [Validators.required]],
      address: ['', [Validators.required] ],
    })

  }

  updateProvider(){
    let id = localStorage.getItem('idProvider');
    this.editForm.value.id = id;
    if(this.editForm.valid){
    this.providerDataService.updateProvider(this.editForm.value.id, this.editForm.value)
      .subscribe(res => {
        console.log(res);
        this._snackBar.open("Proveedor editado correctamente!", "Cerrar", {
          duration: this.durationInSeconds * 1000,
        });
      });
      } else {
        this._snackBar.open("Error, Faltan datos del proveedor", "Cerrar", {
          duration: this.durationInSeconds * 1000,
      })
    }
  }

    //Form getters
    get idField(){
      return this.editForm.get('id')
    };
    get providerNameField(){
      return this.editForm.get('providerName')
    };
    get providerLastNameField(){
      return this.editForm.get('providerLastName')
    };
    get cuitField(){
      return this.editForm.get('cuit')
    };
    get phoneField(){
      return this.editForm.get('phone')
    };
    get addressField(){
      return this.editForm.get('address')
    };

}
