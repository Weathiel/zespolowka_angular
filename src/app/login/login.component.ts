import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../user';
import { Router, NavigationExtras } from '@angular/router';
import { first } from 'rxjs/operators';
import { AlertService } from '../services/alert.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  private user: User;

  constructor(private authService: AuthenticationService,
              private router: Router,
              private alertService: AlertService) { }

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  submit() {
    this.authService.login(this.form.controls.username.value, this.form.controls.password.value).pipe(first()).subscribe(data => {
      this.router.navigate(['']);
    },
      error => {
         this.alertService.error(error);
      });
  }
}
