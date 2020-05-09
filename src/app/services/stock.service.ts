import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Exchange, Candle, Symbol, CandleRequest } from '../models';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(private http: HttpClient) { }

  getExchanges(): Observable<Exchange> {
    return this.http.get<Exchange>(`${environment.finnhubURL}/stock/exchange?token=${environment.finnhubToken}`);
  }

  // tslint:disable-next-line: ban-types
  getSymbols(exchange: string): Observable<Symbol> {
    // tslint:disable-next-line: ban-types
    return this.http.get<Symbol>(`${environment.finnhubURL}/stock/symbol?exchange=${exchange}&token=${environment.finnhubToken}`);
  }

  getCandles(request: CandleRequest): Observable<Candle> {
    return this.http.get<Candle>(`${environment.finnhubURL}/stock/candle?symbol=${request.symbol}&resolution=${request.resolution}&` +
    `from=${request.from.getTime() / 1000}&to=${request.to.getTime() / 1000}&token=${environment.finnhubToken}`);
  }
}
