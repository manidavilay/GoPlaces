import { Component } from '@angular/core';

import { ProfileService } from '../auth/profile/profile.service';

@Component({
  selector: 'app-merchant',
  templateUrl: './merchant.component.html',
  styleUrls: ['./merchant.component.scss']
})

export class MerchantComponent {
  message: any;
  showMerchant: boolean = true;
  // hideAccount: boolean = true;

  constructor(public profileService: ProfileService) {
    this.profileService.getMessage().subscribe(message => {
      this.showMerchant = !this.showMerchant
      // this.hideAccount = !this.hideAccount
    })
  }

  // Back to profile on click
  returnToProfile() {
    this.showMerchant = false
  }
}
