import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Provider } from '../models/provider.model';

@Injectable({
  providedIn: 'root'
})
export class ProviderDataService {

  constructor(private http:HttpClient) { }

  public getProviders(): Observable<Provider[]>  {
    return this.http.get<Provider[]>(environment.URL + 'proveedor/traer');
  }

  public getProviderById(id: number): Observable<Provider> {
    return this.http.get<Provider>(environment.URL + 'proveedor/traer/'+id);
  }

  public createProvider(provider: Provider): Observable<Provider> {
    return this.http.post<Provider>(environment.URL + 'proveedor/crear', provider);
  }

  public updateProduct(id: number , provider: Provider): Observable<Provider> {
    return this.http.put<Provider>(environment.URL + 'proveedor/editar/'+ id,  provider);
  }

  public activateProvider(id: number): Observable<Provider> {
    return this.http.post<Provider>(environment.URL + 'proveedor/activar/', + id);
  }

  public deactivateProvider(id: number): Observable<Provider> {
    return this.http.post<Provider>(environment.URL + 'proveedor/desactivar/', + id);
  }

  public deleteProvider(id: number): Observable<Provider> {
    return this.http.delete<Provider>(environment.URL + 'proveedor/borrar/' + id);
  }
  
  
}
