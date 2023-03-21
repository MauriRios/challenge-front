import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OrderDetail } from '../models/orderDetail.model';
import { Sale } from '../models/sale.model';
import { SaleDTO } from '../models/saleDTO.model';

@Injectable({
  providedIn: 'root'
})
export class SaleDataService {

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

}
