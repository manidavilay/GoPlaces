import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../navigation/navigation.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})

export class AccountComponent {
  message: any;
  isShow: boolean = true;
  isHidden: boolean = true;

  constructor(private navigationService: NavigationService) {
    this.navigationService.getMessage().subscribe(message => {
      this.isShow = !this.isShow
      this.isHidden = !this.isHidden
    })
  }
}
