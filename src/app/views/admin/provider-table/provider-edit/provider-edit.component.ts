import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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


  constructor(private providerDataService : ProviderDataService,
              private fb: FormBuilder,
              
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
        console.log(this.provider)
      }
    );
  }

  createEditForm(){
    this.editForm = this.fb.group({
      id: ['', Validators.required],
      providerName: ['', [Validators.required]],
      providerLastName: ['', [Validators.required]],
      cuit: ['', Validators.required],
      phone: ['', [Validators.required]],
      address: ['', [Validators.required] ],
    })
  }

    //Form getters
    get brandField(){
      return this.editForm.get('id')
    };
    get styleField(){
      return this.editForm.get('providerName')
    };
    get categoryField(){
      return this.editForm.get('providerLastName')
    };
    get volumeField(){
      return this.editForm.get('cuit')
    };
    get priceField(){
      return this.editForm.get('phone')
    };
    get stockField(){
      return this.editForm.get('address')
    };

}
