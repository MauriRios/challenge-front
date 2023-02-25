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

  getCustomerById(id: number): Observable<Customer> {
    return this.http.get<Customer>(environment.URL + 'cliente/traer/'+id);
  }


}

