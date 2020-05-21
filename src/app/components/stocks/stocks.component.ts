import { Component, OnInit, OnDestroy } from '@angular/core';
import { StockService } from 'src/app/services/stock.service';
import { CandleRequest } from 'src/app/models';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.scss']
})
export class StocksComponent implements OnInit, OnDestroy {

  constructor(private stockService: StockService) { }

  model = new CandleRequest();
  loading = false;
  subscriptions: Subscription[] = [];

  dataSets: ChartDataSets[] = [];

  lineOptions: ChartOptions = {
    responsive: true,
    scales: {
      xAxes: [{
        type: 'time',
        time: {
          unit: 'day'
        }
      }]
    },
    elements: {
      point: {
        radius: 0
      }
    }
  };

  ngOnInit() { }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => {
      s.unsubscribe();
    });
  }

  test() {
    this.model.symbol = 'AAPL';
    this.model.resolution = 'D',
    this.model.from = new Date('2020/01/01');
    this.model.to = new Date('2020/04/01');
  }

  submit() {
    this.loading = true;

    this.subscriptions.push(this.stockService.getCandles(this.model).pipe(
      finalize(() => { this.loading = false; })
    ).subscribe(res => {
      const stonks = res.o.map((o, i) => {
         return { y: o, x: new Date(res.t[i] * 1000) };
        });

      this.dataSets.push(
        { data: stonks, fill: false, label: this.model.symbol, lineTension: 0.1 }
      );
    }));
  }

  clear() {
    this.dataSets = [];
  }
}
