import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StockService } from './services/stock.service';
import { StocksComponent } from './components';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { 
  MatCardModule,
  MatInputModule,
  MatDatepickerModule,
  MatSelectModule, 
  MatFormFieldModule,
  MatNativeDateModule} from '@angular/material';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    StocksComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ChartsModule,
    MatCardModule,
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule,
    MatFormFieldModule,
    MatNativeDateModule
  ],
  providers: [StockService],
  bootstrap: [AppComponent]
})
export class AppModule { }
