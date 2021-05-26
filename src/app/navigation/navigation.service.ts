import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class NavigationService {
  private subject = new Subject<any>();

  // Show account on click
  showAccount() {
    this.subject.next();
  }

  // Hide account on click
  hideAccount() {
    this.subject.next();
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }
}
