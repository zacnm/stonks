import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Exchange, Candle, Symbol } from '../models';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(private http: HttpClient) { }

  getExchanges() : Observable<Exchange> {
    return this.http.get<Exchange>(`${environment.finnhubURL}/stock/exchange?token=${environment.finnhubToken}`);
  }

  getSymbols(exchange: string) : Observable<Symbol> {
    return this.http.get<Symbol>(`${environment.finnhubURL}/stock/symbol?exchange=${exchange}&token=${environment.finnhubToken}`);
  }

  getCandles(symbol: string, resolution: string, from: Date, to: Date) : Observable<Candle> {
    return this.http.get<Candle>(`${environment.finnhubURL}/stock/candle?symbol=${symbol}&resolution=${resolution}&from=${from.getTime() / 1000}&to=${to.getTime()/ 1000}&token=${environment.finnhubToken}`)
  }
}
