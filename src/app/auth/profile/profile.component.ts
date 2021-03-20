import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, NavigationStart } from '@angular/router';
import { mimeType } from './mime-type.validator'

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

  constructor(private router: Router, private accountService: AccountService) {
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
   this.form =  new FormGroup({
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      })
   })
  }

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

  returnToAccount() {
    this.showProfile = false
  }
}
