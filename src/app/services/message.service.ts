import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { URL } from '../config';
import { Offer } from '../offer';
import { Message } from '../message';

@Injectable({ providedIn: 'root' })
export class MessageService {
    constructor(private http: HttpClient,
                private url: URL) { }


     new(message: Message) {
        return this.http.post(this.url.url + `message/sendMail`, message);
    }
}
