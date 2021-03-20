import { Component } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

import { NavigationService } from '../navigation/navigation.service';
import { AuthService } from '../auth/auth.service';
import { AccountService } from '../account/account.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})

export class AccountComponent {
  message: any;
  showAccount: boolean = true;
  hideAccount: boolean = true;

  constructor(private router: Router, public authService: AuthService, private navigationService: NavigationService, private accountService: AccountService) {
    this.navigationService.getMessage().subscribe(message => {
      this.showAccount = !this.showAccount
      this.hideAccount = !this.hideAccount
    })
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if (event['url'] !== '/map') {
          this.showAccount = false
        } else {
          this.hideAccount = true
        }
      }
    })
  }

  showProfile(): void {
    this.accountService.showProfile()
  }

  hideProfile(): void {
    this.accountService.hideProfile()
  }

  onLogout() {
    this.showAccount = !this.showAccount
    this.authService.logout()
  }
}
