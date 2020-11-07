import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '../user';
import { URL } from '../config';
import { Orders } from '../orders';
import { AuthenticationService } from './authentication.service';

@Injectable({ providedIn: 'root' })
export class OrdersService {
    constructor(private http: HttpClient,
                private authService: AuthenticationService,
                private url: URL) { }

    getAll(index: number, pageSize: number, sortBy: string, sortOrder: string) {
        // tslint:disable-next-line:max-line-length
        if (this.authService.currentUserValue.role[0] === 'ROLE_WORKER') {
            // tslint:disable-next-line:max-line-length
            return this.http.get<Orders[]>(this.url.url + `orders?page=` + index + `&size=` + pageSize + '&sortBy=' + sortBy + '&sortOrder=' + sortOrder);
        }
        return this.getMyOrders();
    }

    new(order: Orders) {
        return this.http.post(this.url.url + `orders/new`, order);
    }

    getMyOrders() {
        return this.http.get<Orders[]>(this.url.url + `orders/token`);
    }

    getMyLenght() {
        return this.http.get<number>(this.url.url + `orders/userLenght`);
    }

    getLenght() {
        // tslint:disable-next-line:max-line-length
        if (this.authService.currentUserValue.role[0] === 'ROLE_WORKER') {
            // tslint:disable-next-line:max-line-length
            return this.http.get<number>(this.url.url + `orders/length`, {headers: new HttpHeaders().set('Content-Type', 'application/json') });
        }
        return this.getMyLenght();

    }

    update(id, order: Orders) {
        return this.http.put(this.url.url + `orders/` + id, order);
    }

    delete(id: number) {
        return this.http.delete(this.url.url + `orders/${id}`);
    }
}
