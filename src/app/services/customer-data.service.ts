import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Customer } from '../models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerDataService {

  constructor(private http:HttpClient) { }

  public getCustomers(): Observable<Customer[]>  {
    return this.http.get<Customer[]>(environment.URL + 'cliente/traer');
  }

  public getCustomerById(id: number): Observable<Customer> {
    return this.http.get<Customer>(environment.URL + 'cliente/traer/'+id);
  }
  
  public createCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(environment.URL + 'cliente/crear', customer);
  }

  public updateCustomer(id: number , customer: Customer): Observable<Customer> {
    return this.http.put<Customer>(environment.URL + 'cliente/editar/'+ id,  customer);
  }

  public deleteCustomer(id: number): Observable<Customer> {
    return this.http.delete<Customer>(environment.URL + 'cliente/borrar/' + id);
  }

  public toggleCustomer(id: number, active: boolean): Observable<any> {
    const endpoint = active ? 'activar' : 'desactivar';
    const url = `${environment.URL+ '/cliente/'}${endpoint}/${id}`;
    return this.http.put(url, {});
  }


}

