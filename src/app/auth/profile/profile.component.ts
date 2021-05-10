import { Component } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router, NavigationStart } from '@angular/router';
import { mimeType } from './mime-type.validator'
import { ActivatedRoute } from "@angular/router";
import { HttpClient } from '@angular/common/http';

import { AuthService } from '../auth.service'
import { AccountService } from '../../account/account.service';
import { ProfileService } from '../../auth/profile/profile.service';
import { Subscription } from 'rxjs';
import { AuthData } from '../auth-data.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent {
  showProfile: boolean = true;
  hideProfile: boolean = true;
  isShow = false;
  isHidden = false;
  form: FormGroup;
  imagePreview: any;
  userIsAuthenticated = false;
  private authStatusSub: Subscription;
  userId: string;
  users: any = [];

  constructor(
    private router: Router,
    public route: ActivatedRoute,
    private accountService: AccountService,
    private authService: AuthService,
    private profileService: ProfileService,
    private http: HttpClient
    ) {
    // Show / Hide profile on click
    this.accountService.getMessage().subscribe(message => {
      this.showProfile = !this.showProfile
      this.hideProfile = !this.hideProfile
    })
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if (event['url'] !== '/map') {
          this.showProfile = false
        } else {
          this.hideProfile = true
        }
      }
    })
  }

  ngOnInit() {
    this.userId = this.authService.getUserId()
    this.userIsAuthenticated = this.authService.getIsAuth()
    this.authStatusSub = this.authService
    .getAuthStatusListener()
    .subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated
      this.userId = this.authService.getUserId()
    })

    this.form = new FormGroup({
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      }),
      lastname: new FormControl(null, {
        validators: [Validators.required]
      }),
      firstname: new FormControl(null, {
        validators: [Validators.required]
      }),
      password: new FormControl(null, {
        validators: [Validators.required]
      })
    })

    this.fetchCurrentUser(this.userId)
  }

  // Image uploader
  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0]
    this.form.patchValue({image: file})
    this.form.get('image').updateValueAndValidity()
    const reader = new FileReader()
    reader.onload = () => {
      this.imagePreview = reader.result
    }
    reader.readAsDataURL(file)
  }

  // Back to account on click
  returnToAccount() {
    this.showProfile = false
  }

  // Fetch current user's informations
  fetchCurrentUser(userId) {
    if (this.userId) {
      this.authService.getCurrentUser(this.userId)
      .subscribe(response => {
        this.users = response
        this.users = []
        this.users.push(response)
      })
    }
  }

  // Show and edit elements on edit button click
  editInfosBtn() {
    this.isShow = !this.isShow
    this.isHidden = !this.isHidden
  }

  // Save user's infos on save button click
  saveInfos() {
    this.authService.updateUserInfos(this.userId, this.form.value.lastname, this.form.value.firstname, this.form.value.password)
    this.isShow = !this.isShow
    this.isHidden = !this.isHidden
  }

  // Delete user's account
  deleteUserAccount() {
    this.authService.deleteUser(this.userId)
    this.authService.logout()
  }

  showMerchant(): void {
    this.profileService.showMerchant()
  }

  // hideAccount(): void {
  //   this.navigationService.hideAccount()
  // }
}
