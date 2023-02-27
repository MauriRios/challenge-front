import { HttpClient } from '@angular/common/http';
import { Injectable, Provider } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProviderDataService {

  constructor(private http:HttpClient) { }

  public getProviders(): Observable<Provider[]>  {
    return this.http.get<Provider[]>(environment.URL + 'proveedor/traer');
  }

  getProviderById(id: number): Observable<Provider> {
    return this.http.get<Provider>(environment.URL + 'proveedor/traer/'+id);
  }
  
}
