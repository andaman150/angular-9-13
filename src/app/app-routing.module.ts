import { StockEditComponent } from './stock/stock-edit/stock-edit.component';
import { StockCreateComponent } from './stock/stock-create/stock-create.component';
import { StockHomeComponent } from './stock/stock-home/stock-home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: 'stock', component: StockHomeComponent},
  {path: 'stock/create', component: StockCreateComponent},
  {path: 'stock/edit/:id', component: StockEditComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
