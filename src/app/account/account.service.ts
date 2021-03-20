import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class AccountService {
    private subject = new Subject<any>();

    showProfile() {
      this.subject.next()
    }

    hideProfile() {
      this.subject.next()
    }

    getMessage(): Observable<any> {
       return this.subject.asObservable();
    }
}
