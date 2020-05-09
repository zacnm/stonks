import { Component, OnInit } from '@angular/core';
import { StockService } from 'src/app/services/stock.service';
import { CandleRequest, Candle } from 'src/app/models';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.scss']
})
export class StocksComponent implements OnInit {

  constructor(private stockService: StockService) { }

  model = new CandleRequest();
  dataLoaded = false;

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
  

  ngOnInit() {
    
  }

  test() {
    this.model.symbol = 'AAPL';
    this.model.resolution = 'D',
    this.model.from = new Date('2020/01/01');
    this.model.to = new Date('2020/04/01');
  }

  submit() {
    this.stockService.getCandles(this.model).subscribe(res => {
      let data = res.o.map((o, i) => {
         return { y: o, x: new Date(res.t[i] * 1000) }
        });
      
      this.dataSets.push(
        { data: data, fill: false, label: this.model.symbol, lineTension: 0.1 }
      );

      this.dataLoaded = true;
    })
  }

  clear() {
    this.dataSets = [];
  }
}
