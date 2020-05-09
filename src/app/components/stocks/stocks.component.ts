import { Component, OnInit } from '@angular/core';
import { StockService } from 'src/app/services/stock.service';
import { Exchange } from 'src/app/models';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.scss']
})
export class StocksComponent implements OnInit {

  constructor(private stockService: StockService) { }

  data: [];
  model = {};

  ngOnInit() {
    
  }

}
