import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {NotificationService} from '../services/notification.service';
import {first} from 'rxjs/operators';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-creategroupaccount',
  templateUrl: './creategroupaccount.component.html',
  styleUrls: ['./creategroupaccount.component.css']
})
export class CreategroupaccountComponent implements OnInit {
  newName: string;
  newEmail: string;
  newUsername: string;
  newPassword: string;
  group: string;
  members: any[] = [];

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private userService: UserService,
              private notification: NotificationService) {
    this.newName = '';
    this.newEmail = '';
    this.newUsername = '';
    this.newPassword = '';
    this.group = '';
  }

  addMember(): void {
    if (this.newName.length === 0 || this.newEmail.length === 0
    || this.newUsername.length === 0 || this.newPassword.length === 0){
      this.notification.notify('Please fill in all fields', 'clear');
      return;
    }
    const newMember = {
      name: this.newName,
      email: this.newEmail,
      username: this.newUsername,
      password: this.newPassword
    };
    this.members.push(newMember);
    this.newName = '';
    this.newEmail = '';
    this.newUsername = '';
    this.newPassword = '';
  }

  removeMember(member: any): void {
    const i = this.members.indexOf(member);
    this.members.splice(i, 1);
  }

  ngOnInit(): void {
  }

  submit(): void {
    if (this.members.length < 2){
      this.notification.notify('Please add at least 2 members', 'clear');
      return;
    }
    if (this.group === ''){
      this.notification.notify('Please enter a group name', 'clear');
      return;
    }
    for (const member of this.members){
      member.group = this.group;
      this.userService.register(member)
        .pipe(first())
        .subscribe(
          () => {},
          error => {
            this.notification.notify(error, 'clear');
            return;
          });
    }
    this.notification.notify('Registered group successfully', 'clear');
    this.router.navigate(['/login']);
  }
}
