import { Component, OnInit } from '@angular/core';
import { Message } from '../message';
import { MessageService } from '../services/message.service';
import { User } from '../user';
import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  subject: string;
  message: string;

  constructor(private messageService: MessageService,
              private userService: UserService,
              private authService: AuthenticationService) { }

  ngOnInit() {
  }

  messageChange(value) {
    this.message = value;
  }

  subjectChange(value) {
    this.subject = value;
  }

  onClick() {
    const msg = new Message();
    msg.message = this.message;
    msg.subject = this.subject;
    msg.from = this.authService.currentUserValue.email;
    this.messageService.new(msg).subscribe();
  }
}
