import { Component } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { mimeType } from './mime-type.validator';

import { ProfileService } from '../auth/profile/profile.service';

@Component({
  selector: 'app-merchant',
  templateUrl: './merchant.component.html',
  styleUrls: ['./merchant.component.scss']
})

export class MerchantComponent {
  message: any;
  form: FormGroup;
  imagePreview: any;
  showMerchant: boolean = false;
  // hideAccount: boolean = true;

  constructor(public profileService: ProfileService) {
    this.profileService.getMessage().subscribe(message => {
      this.showMerchant = true
      // this.hideAccount = !this.hideAccount
    })
  }

  ngOnInit() {
    this.form = new FormGroup({
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      })
    })
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

  // Back to profile on click
  returnToProfile() {
    this.showMerchant = false
  }
}
