import { HttpHandler, HttpInterceptor, HttpRequest, HttpEvent, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { MapService } from "./map.service";

@Injectable()
export class MapInterceptor implements HttpInterceptor {
  constructor(private mapService: MapService) {}
  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const API_KEY = '87ae20e4-b136-30cc-b421-c949c6da0825';
    return next.handle(httpRequest.clone({
      setHeaders: {
        Authorization: `Bearer ${API_KEY}`
      }
    }));
  }
}
