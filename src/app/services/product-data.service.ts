import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductDataService {

  private _refresh$ = new Subject<void>();

  constructor(private http:HttpClient) { }

  public getProducts(): Observable<Product[]>  {
    return this.http.get<Product[]>(environment.URL + 'producto/traer');
  }

  public getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(environment.URL + 'producto/traer/'+id);
  }

  public getProductsByLowStock(stock: number): Observable<Product[]> {
    const query = `producto/lowStock?stock=${stock}`;
    return this.http.get<Product[]>(environment.URL + query)
  }

  public createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(environment.URL + 'producto/crear', product)
    .pipe(
      tap(()=> {
          this._refresh$.next();
      })
    );
  }

  public updateProduct(id: number , product: Product): Observable<Product> {
    return this.http.put<Product>(environment.URL + 'producto/editar/'+ id,  product)
    .pipe(
      tap(()=> {
          this._refresh$.next();
      })
    );
  }
  public deleteProduct(id: number): Observable<any> {
    return this.http.delete<any>(environment.URL + 'producto/borrar/' + id)
    .pipe(
      tap(()=> {
          this._refresh$.next();
      })
    );
  }

  public toggleProduct(id: number, active: boolean): Observable<any> {
    const endpoint = active ? 'activar' : 'desactivar';
    const url = `${environment.URL + 'producto/'}${endpoint}/${id}`;
    return this.http.put(url, {});
  }

  get refresh$() {
    return this._refresh$;
  }


  
}
