import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductDataService {

  constructor(private http:HttpClient) { }

  public getProducts(): Observable<Product[]>  {
    return this.http.get<Product[]>(environment.URL + 'producto/traer');
  }

  public getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(environment.URL + 'producto/traer/'+id);
  }

  public createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(environment.URL + 'producto/crear', product);
  }

  public updateProduct(id: number , product: Product): Observable<Product> {
    return this.http.put<Product>(environment.URL + 'producto/editar/'+ id,  product);
  }

  public activateProduct(id: number): Observable<Product> {
    return this.http.post<Product>(environment.URL + 'producto/activar/', + id);
  }

  public deactivateProduct(id: number): Observable<Product> {
    return this.http.post<Product>(environment.URL + 'producto/desactivar/', + id);
  }

  public deleteProduct(id: number): Observable<Product> {
    return this.http.delete<Product>(environment.URL + 'producto/borrar/' + id);
  }
  
}
