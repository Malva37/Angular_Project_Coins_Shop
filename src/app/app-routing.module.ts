import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { HomeComponent } from './pages/home/home.component';
import { CoinsComponent } from './pages/coins/coins.component';
import { BanknotesComponent } from './pages/banknotes/banknotes.component';
import { MedalsComponent } from './pages/medals/medals.component';
import { AccessoriesComponent } from './pages/accessories/accessories.component';
import { BasketComponent } from './pages/basket/basket.component';

import { AdminComponent } from './admin/admin.component';
import { AdminCoinsComponent } from './admin/admin-coins/admin-coins.component';
import { AdminBanknotesComponent } from './admin/admin-banknotes/admin-banknotes.component';
import { AdminMedalsComponent } from './admin/admin-medals/admin-medals.component';
import { AdminAccessoriesComponent } from './admin/admin-accessories/admin-accessories.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { AdminPageComponent } from './admin/admin-page/admin-page.component';
import { AdminGuard } from './admin/admin.guard';
import { SignInComponent } from './pages/sign-in/sign-in.component';



const routes: Routes = [
  {path: '', redirectTo: 'coins', pathMatch:'full'},
  // {path: 'home', component: HomeComponent},
  {path: 'coins', component: CoinsComponent},
  {path: 'banknote', component: BanknotesComponent},
  {path: 'medals', component: MedalsComponent},
  {path: 'accessories', component: AccessoriesComponent},
  {path: 'basket', component: BasketComponent},
  {path: 'product/:categoryName/:id', component: ProductDetailsComponent},
  {path: 'sign-in', component: SignInComponent},
 
  {path: 'admin', component: AdminComponent,children:[
  {path: '', redirectTo: 'coins', pathMatch:'full'},
  {path: 'coins', component: AdminCoinsComponent},
  {path: 'banknotes', component: AdminBanknotesComponent},
  {path: 'medals', component: AdminMedalsComponent},
  {path: 'accessories', component: AdminAccessoriesComponent},
  {path: 'orders', component: AdminOrdersComponent},
  // {path: 'adminPage', component: AdminPageComponent, canActivate: [AdminGuard]}
  ]},
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
