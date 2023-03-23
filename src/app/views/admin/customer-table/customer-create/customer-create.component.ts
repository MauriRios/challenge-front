import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Customer } from 'src/app/models/customer.model';
import { CustomerDataService } from 'src/app/services/customer-data.service';

@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.css']
})
export class CustomerCreateComponent implements OnInit {

  customer: Customer = new Customer();
  durationInSeconds = 5;
  addForm: FormGroup;
  
  constructor(private customerDataService : CustomerDataService,
              private fb: FormBuilder,
              private _snackBar: MatSnackBar) {

                this.createAddForm();
              }

  ngOnInit(): void {
  }

  createAddForm(){
    this.addForm = this.fb.group({
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      dni: ['', Validators.required],
      phone: ['', [Validators.required]],
      address: ['', [Validators.required] ],
    })

  }

  addCustomer(){
    if(this.addForm.valid){
    this.customerDataService.createCustomer(this.addForm.value)
    .subscribe(res => {
        console.log(res);
        this._snackBar.open("Cliente Agregado correctamente!", "Cerrar", {
          duration: this.durationInSeconds * 1000,
        }); })
        } else {
          this._snackBar.open("Error! Faltan datos del Cliente", "Cerrar", {
            duration: this.durationInSeconds * 1000,
          });
          this.addForm.markAllAsTouched();
        }
      }
    
    //Form getters
    get customerNameField(){
      return this.addForm.get('name')
    };
    get customerLastNameField(){
      return this.addForm.get('lastName')
    };
    get dniField(){
      return this.addForm.get('dni')
    };
    get phoneField(){
      return this.addForm.get('phone')
    };
    get addressField(){
      return this.addForm.get('address')
    };

}
