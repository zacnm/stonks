import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Exchange, Candle, StockSymbol, CandleRequest } from '../models';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(private http: HttpClient) { }

  getExchanges(): Observable<Exchange> {
    return this.http.get<Exchange>(`${environment.apiUrl}/stocks/exchanges`);
  }

  getSymbols(exchange: string): Observable<StockSymbol> {
    return this.http.get<StockSymbol>(`${environment.apiUrl}/stocks/symbols/${exchange}`);
  }

  getCandles(request: CandleRequest): Observable<Candle> {
    return this.http.post<Candle>(`${environment.apiUrl}/stocks/candles`, request);
  }
}
