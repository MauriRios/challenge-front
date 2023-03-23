import { Component, OnInit } from '@angular/core';
import { Provider } from 'src/app/models/provider.model';
import { ProviderDataService } from 'src/app/services/provider-data.service';

@Component({
  selector: 'app-provider-info-dialog',
  templateUrl: './provider-info-dialog.component.html',
  styleUrls: ['./provider-info-dialog.component.css']
})
export class ProviderInfoDialogComponent implements OnInit {

  provider: Provider = new Provider();

  constructor(private providerDataService : ProviderDataService,
              
              ) { }

  ngOnInit(): void {
    this.getProvider();
  }

  getProvider(): void {
    let id = localStorage.getItem('idProvider');
    this.providerDataService.getProviderById(+id).subscribe(
      data => { 
        this.provider = data;  
      });
  }

}
