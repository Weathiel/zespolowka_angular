import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { NavbarComponent } from './navbar/navbar.component';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { HomeComponent, HomeFilterOfferDialogComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { JwtInterceptor } from './jwt.interceptor';
import { ErrorInterceptor } from './error.interceptor';
import { HttpModule } from '@angular/http';
import { AlertComponent } from './alert/alert.component';
import { UserManagementComponent, EditUserDialogComponent, FilterUserDialogComponent } from './user-management/user-management.component';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material';
import { ManagementDialogComponent } from './management-dialog/management-dialog.component';
import { OrdersManagmentComponent, EditOrdersDialogComponent, FilterOrdersDialogComponent } from './orders-managment/orders-managment.component';
import { OfferManagmentComponent,
   EditOfferDialogComponent, CreateOfferDialogComponent, FilterOfferDialogComponent } from './offer-managment/offer-managment.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { MessageComponent } from './message/message.component';
import { MessageService } from './services/message.service';
import { CarsManagmentComponent, CreateCarsDialogComponent, FilterCarsDialogComponent } from './cars-managment/cars-managment.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    AlertComponent,
    UserManagementComponent,
    ManagementDialogComponent,
    EditUserDialogComponent,
    EditOrdersDialogComponent,
    OrdersManagmentComponent,
    OfferManagmentComponent,
    EditOfferDialogComponent,
    CreateOfferDialogComponent,
    EditProfileComponent,
    FilterOfferDialogComponent,
    HomeFilterOfferDialogComponent,
    MessageComponent,
    CarsManagmentComponent,
    CreateCarsDialogComponent,
    FilterOrdersDialogComponent,
    FilterCarsDialogComponent,
    FilterUserDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true, direction: 'ltr'}}],
  bootstrap: [AppComponent],
  entryComponents: [ManagementDialogComponent, EditUserDialogComponent, EditOrdersDialogComponent,
     EditOfferDialogComponent, CreateOfferDialogComponent, FilterOfferDialogComponent, HomeFilterOfferDialogComponent,
      CreateCarsDialogComponent, FilterOrdersDialogComponent, FilterCarsDialogComponent, FilterUserDialogComponent]
})
export class AppModule { }
