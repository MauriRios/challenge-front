import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Customer } from 'src/app/models/customer.model';
import { CustomerDataService } from 'src/app/services/customer-data.service';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnInit {

  customer: Customer = new Customer();
  editForm!: FormGroup;
  durationInSeconds = 5;

  constructor(private customerDataService : CustomerDataService,
              private fb: FormBuilder,
              private _snackBar: MatSnackBar
              ) { 
                this.createEditForm();
              }
              
    ngOnInit(): void {
                this.getCustomer();
                
    }

    getCustomer():void{
    let id = localStorage.getItem('idCustomer');
    this.customerDataService.getCustomerById(+id!).subscribe(
      data => {
        this.customer = data;

      }
    );
  }

  createEditForm(){
    this.editForm = this.fb.group({
      id: [''],
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      dni: ['', Validators.required],
      phone: ['', [Validators.required]],
      address: ['', [Validators.required] ],
    })

  }

  updateCustomer(){
    let id = localStorage.getItem('idCustomer');
    this.editForm.value.id = id;
    if(this.editForm.valid){
    this.customerDataService.updateCustomer(this.editForm.value.id, this.editForm.value)
      .subscribe(() => {
        this._snackBar.open("Cliente editado correctamente!", "Cerrar", {
          duration: this.durationInSeconds * 1000,
        });
        this.ngOnInit();});
      } else {
        this._snackBar.open("Error, Faltan datos del cliente", "Cerrar", {
          duration: this.durationInSeconds * 1000,
      })
    }
  }

    //Form getters
    get idField(){
      return this.editForm.get('id')
    };
    get customerNameField(){
      return this.editForm.get('name')
    };
    get customerLastNameField(){
      return this.editForm.get('lastName')
    };
    get dniField(){
      return this.editForm.get('dni')
    };
    get phoneField(){
      return this.editForm.get('phone')
    };
    get addressField(){
      return this.editForm.get('address')
    };

}
