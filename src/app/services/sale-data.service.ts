import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OrderDetail } from '../models/orderDetail.model';
import { Sale } from '../models/sale.model';
import { SaleDTO } from '../models/saleDTO.model';
import { createSale } from '../models/createSale.model';

@Injectable({
  providedIn: 'root'
})
export class SaleDataService {

  private _refresh$ = new Subject<void>();


  constructor(private http:HttpClient) { }

  public getSales(): Observable<Sale[]>  {
    return this.http.get<Sale[]>(environment.URL + 'venta/traer');
  }

  public getSaleById(id: number): Observable<SaleDTO> {
    return this.http.get<SaleDTO>(environment.URL + 'venta/traer/'+id);
  }

  public getOrders(): Observable<OrderDetail[]> {
    return this.http.get<OrderDetail[]>(environment.URL + 'venta/ordenes');
  }

  public createSale(saleDTO: createSale): Observable<SaleDTO> {
    return this.http.post<SaleDTO>(environment.URL + 'venta/crear', saleDTO)
    .pipe(
      tap(()=> {
          this._refresh$.next();
      })
    );
  }


  //TODO arreglar el refresh de la tabla de ventas
  get refresh$() {
    return this._refresh$;
  }

}
