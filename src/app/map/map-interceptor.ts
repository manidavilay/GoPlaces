// import { HttpHandler, HttpInterceptor, HttpRequest, HttpEvent, HttpResponse } from "@angular/common/http";
// import { Injectable } from "@angular/core";
// import { Observable } from 'rxjs';
// import { map, filter } from 'rxjs/operators';

// import { MapService } from "./map.service";

// @Injectable()
// export class MapInterceptor implements HttpInterceptor {
//   constructor(private mapService: MapService) {}
//   intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     const API_KEY = '7887b45f-92e7-331a-b897-c366087c1e9b';
//     return next.handle(httpRequest.clone({
//       setHeaders: {
//         Authorization: `Bearer ${API_KEY}`
//       }
//     }));
//   }
// }
