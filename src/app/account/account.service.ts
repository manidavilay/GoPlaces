import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class AccountService {
  private subject = new Subject<any>();

  // Show profile on click
  showProfile() {
    this.subject.next();
  }

  // Show rewards on click
  showRewards() {
    this.subject.next();
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }
}
