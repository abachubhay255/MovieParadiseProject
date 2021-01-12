import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {NotificationService} from '../services/notification.service';
import {UserService} from '../services/user.service';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-createaccount',
  templateUrl: './createaccount.component.html',
  styleUrls: ['./createaccount.component.css']
})
export class CreateaccountComponent implements OnInit {
  accountForm: FormGroup;
  loading = false;
  submitted = false;
  roles = [];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private notification: NotificationService,
    private userService: UserService
  ) {
  }

  ngOnInit(): void {
    this.accountForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]+$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      group: ['']
    });
  }

  get fields(): any {
    return this.accountForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    // stop here if form is invalid
    if (this.accountForm.invalid) {
      this.notification.notify('Fix incorrect fields', 'clear');
      return;
    }
    this.loading = true;
    this.userService.register(this.accountForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.notification.notify('Registered user successfully', 'clear');
          this.router.navigate(['/login']);
        },
        error => {
          this.notification.notify(error, 'clear');
          this.loading = false;
        });
  }
}
