import { Component } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

import { NavigationService } from '../navigation/navigation.service';
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})

export class NavigationComponent {
  public showNav: boolean = false;

  // Show nav only when connected
  constructor(private router: Router, private navigationService: NavigationService) {
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if (event['url'] !== '/map') {
          this.showNav = false;
        } else {
          this.showNav = true;
        }
      }
    });
  }

  // Show account on click
  showAccount(): void {
    this.navigationService.showAccount();
  }

  // Hide account on click
  hideAccount(): void {
    this.navigationService.hideAccount();
  }
}
