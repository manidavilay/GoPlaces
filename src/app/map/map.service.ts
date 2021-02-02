import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class MapService {
  private myAccessToken: '7887b45f-92e7-331a-b897-c366087c1e9b';

  constructor(private http: HttpClient) {
  }

  getMyAccessToken() {
    return this.myAccessToken;
  }
}
