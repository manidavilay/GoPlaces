import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, NavigationStart } from '@angular/router';
import { mimeType } from './mime-type.validator'
import { ActivatedRoute } from "@angular/router";
import { HttpClient } from '@angular/common/http';

import { AuthService } from '../auth.service'
import { AccountService } from '../../account/account.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent {
  showProfile: boolean = true;
  hideProfile: boolean = true;
  form: FormGroup;
  imagePreview: any;
  users: any = [];

  constructor(
    private router: Router,
    public route: ActivatedRoute,
    private accountService: AccountService,
    private authService: AuthService,
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
   this.form = new FormGroup({
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      })
   })
   this.fetchUsers()
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

  // Fetch user's informations
  fetchUsers() {
    this.http.get('http://localhost:3000/api/user/signup')
    .subscribe(response => {
      this.users = response
      this.users = this.users.posts
    })
  }
}
