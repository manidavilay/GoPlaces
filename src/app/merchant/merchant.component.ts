import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { mimeType } from './mime-type.validator';
import { Router, NavigationStart } from '@angular/router';

import { ProfileService } from '../auth/profile/profile.service';
import { MerchantService } from './merchant.service';

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
  showQrCodePopup: boolean = false;
  addresses: any = [];

  // Show / hide merchant on click
  constructor(
    private router: Router,
    public profileService: ProfileService,
    public merchantService: MerchantService
    ) {
    this.profileService.getMessage().subscribe(message => {
      this.showMerchant = true;
    });
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if (event['url'] !== '/map') {
          this.showMerchant = false;
        }
      }
    });
  }

  ngOnInit() {
    this.form = new FormGroup({
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      })
    });

    this.fetchAddressData();
  }

  // Image uploader
  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image: file});
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result
    }
    reader.readAsDataURL(file);
  }

  // Back to profile on click
  returnToProfile() {
    this.showMerchant = false;
  }

  // Open QR code popup on click
  openQrcodePopup() {
    this.showQrCodePopup = true;
  }

  // Close QR code popup on click
  closeQrCodePopup() {
    this.showQrCodePopup = false;
  }

  // Fetch current merchant's QR code data string
  fetchAddressData() {
    this.merchantService.getAddressesData()
    .subscribe(response => {
      this.addresses = response;
      this.addresses = [];
      this.addresses.push(response);
    });
  }
}
