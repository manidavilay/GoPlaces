// Import modules
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from  '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// import { HashLocationStrategy, LocationStrategy } from '@angular/common';

// Import components
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { MapComponent } from './map/map.component';
import { NavigationComponent } from './navigation/navigation.component';
import { HeaderComponent } from './header/header.component';
import { AccountComponent } from './account/account.component';
import { ProfileComponent } from './auth/profile/profile.component';
import { MerchantComponent } from './merchant/merchant.component';

// Import interceptors
import { AuthInterceptor } from './auth/auth-interceptor';
// import { MapInterceptor } from './map/map-interceptor';

// Import services
// import { MapService } from './map/map.service';
import { NavigationService } from './navigation/navigation.service';
import { AccountService } from './account/account.service';
import { ProfileService } from './auth/profile/profile.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    MapComponent,
    NavigationComponent,
    HeaderComponent,
    AccountComponent,
    ProfileComponent,
    MerchantComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatFormFieldModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    // MapService,
    NavigationService,
    AccountService,
    ProfileService
    // { provide: HTTP_INTERCEPTORS, useClass: MapInterceptor, multi: true}
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
