import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class NavigationService {
    private subject = new Subject<any>();

    showAccount() {
      this.subject.next()
    }

    hideAccount() {
      this.subject.next()
    }

    getMessage(): Observable<any> {
       return this.subject.asObservable();
    }
}
