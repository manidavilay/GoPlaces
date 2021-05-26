import { Component } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {
  public showHeader: boolean = false;

  // Show header only when connected
  constructor(private router: Router, private authService: AuthService) {
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if (event['url'] !== '/map') {
          this.showHeader = false;
        } else {
          this.showHeader = true;
        }
      }
    });
  }

  // Logout
  onLogout() {
    this.showHeader = false;
    this.authService.logout();
  }
}
