import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StocksComponent, NotFoundComponent } from './components';

const routes: Routes = [
  { path: '', redirectTo: '/stocks', pathMatch: 'full' },
  { path: 'stocks', component: StocksComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
