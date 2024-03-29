import { Component } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { ActivatedRoute } from "@angular/router";

import { AccountService } from '../account/account.service';

@Component({
  selector: 'app-rewards',
  templateUrl: './rewards.component.html',
  styleUrls: ['./rewards.component.scss']
})

export class RewardsComponent {
  showRewards: boolean = false;

  constructor(
    private router: Router,
    public route: ActivatedRoute,
    private accountService: AccountService,
    ) {
    // Show / Hide rewards on click
    // this.accountService.getMessage().subscribe(message => {
    //   this.showRewards = true
    //   console.log('test')
    // })
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if (event['url'] !== '/map') {
          this.showRewards = false;
        }
      }
    });
  }

  // Back to account on click
  returnToAccount() {
    this.showRewards = false;
  }
}
