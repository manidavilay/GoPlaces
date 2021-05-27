import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MerchantService {

  constructor(
    private http: HttpClient
  ) {}

  // Get merchant's address by id
  getAddressesData(): Observable<any> {
    return this.http.get('http://localhost:3000/api/address/60afa39e8355af12b7564786/');
  }
}
