import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Provider } from 'src/app/models/provider.model';
import { ProviderDataService } from 'src/app/services/provider-data.service';

@Component({
  selector: 'app-provider-delete',
  templateUrl: './provider-delete.component.html',
  styleUrls: ['./provider-delete.component.css']
})
export class ProviderDeleteComponent implements OnInit {
  
  provider: Provider = new Provider();
  durationInSeconds = 5;
  constructor(private providerDataService : ProviderDataService,
              private _snackBar: MatSnackBar
              ) { }

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

  deleteProvider():void{
    this.providerDataService.deleteProvider(this.provider.id).subscribe(
      res => {
        console.log(res);
        this._snackBar.open("Proveedor Eliminado correctamente!", "Cerrar", {
          duration: this.durationInSeconds * 1000,
        });
      }
    );
    }
  
}
