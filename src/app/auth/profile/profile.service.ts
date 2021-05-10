import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class ProfileService {
  private subject = new Subject<any>();

  showMerchant() {
    this.subject.next()
  }

  hideMerchant() {
    this.subject.next()
  }

  getMessage(): Observable<any> {
      return this.subject.asObservable();
  }
}
