import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '../user';
import { URL } from '../config';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient,
                private url: URL) { }

    getAll(index: number, pageSize: number) {
        // tslint:disable-next-line:max-line-length
        return this.http.get<User[]>(this.url.url + `user?page=` + index + `&size=` + pageSize, {headers: new HttpHeaders().set('Content-Type', 'application/json') });
    }

    register(user: User) {
        console.log(user);
        return this.http.post(this.url.url + `user/register`, user);
    }

    getLenght() {
        // tslint:disable-next-line:max-line-length
        return this.http.get<number>(this.url.url + `user/length`, {headers: new HttpHeaders().set('Content-Type', 'application/json') });
    }

    delete(id: number) {
        return this.http.delete<void>(this.url.url + `user/${id}`);
    }

    update(id: number, user: User) {
        return this.http.put(this.url.url + `user/${id}`, user);
    }
}
