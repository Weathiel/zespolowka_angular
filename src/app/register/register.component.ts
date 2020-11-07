import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AlertService } from '../services/alert.service';
import { User } from '../user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  private form: FormGroup;
  private loading = false;
  private submitted = false;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private router: Router,
              private alertService: AlertService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      address: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$')]],
      city: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[-\s\./0-9]*$')]]
    });
  }

  submit() {
     this.alertService.clear();
     if (this.form.invalid) {
      return;
    }
     this.userService.register(this.form.value)
      .pipe(first())
      .subscribe(
        data => {
           this.alertService.success('Registration successful', true);
           this.router.navigate(['/login']);
        },
        error => {
           this.alertService.error(error);
           this.loading = false;
        });
  }
}
