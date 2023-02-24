import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Customer } from '../models/customer.model';
import { CustomerWithoutPurchases, excludePurchases } from '../models/customerWithoutPurchases.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerDataService {

  constructor(private http:HttpClient) { }

  public getCustomers(): Observable<Customer[]>  {
    return this.http.get<Customer[]>(environment.URL + 'cliente/traer');
  }

  public getCustomersWithoutPurchases(): Observable<CustomerWithoutPurchases[]> {
    return this.http.get<Customer[]>(environment.URL + 'cliente/traer').pipe(
      map(customers => customers.map(customer => excludePurchases(customer)))
    );
}

}

