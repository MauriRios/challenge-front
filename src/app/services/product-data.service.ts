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
  
}
