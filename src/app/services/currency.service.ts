import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { URL } from '../config';
import { Offer } from '../offer';
import { Message } from '../message';
import { BehaviorSubject, Observable } from 'rxjs';
import { Currency } from '../currency';

@Injectable({ providedIn: 'root' })
export class CurrencyService {
    private currencyBeh: BehaviorSubject<Currency>;
    private currentCurrency: Observable<Currency>;
    constructor(private http: HttpClient,
                private url: URL) {
                    this.currencyBeh = new BehaviorSubject<Currency>({currencyId: 0, currency_name: 'zloty', exchange_rate: 1});
                    this.currentCurrency = this.currencyBeh.asObservable();
                }


     getAll() {
        return this.http.get(this.url.url + `currency`);
    }

    public getCurVal() {
        return this.currencyBeh.value;
    }

    public getCurr() {
        return this.currencyBeh;
    }
}
