import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Ng5SliderModule } from 'ng5-slider';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
// import { HomeComponent } from './pages/home/home.component';
import { CoinsComponent } from './pages/coins/coins.component';
import { BanknotesComponent } from './pages/banknotes/banknotes.component';
import { MedalsComponent } from './pages/medals/medals.component';
import { BasketComponent } from './pages/basket/basket.component';
import { AccessoriesComponent } from './pages/accessories/accessories.component';
import { AdminComponent } from './admin/admin.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { AdminCoinsComponent } from './admin/admin-coins/admin-coins.component';
import { AdminBanknotesComponent } from './admin/admin-banknotes/admin-banknotes.component';

import { AdminAccessoriesComponent } from './admin/admin-accessories/admin-accessories.component';

import { NgxUiLoaderModule, NgxUiLoaderRouterModule, NgxUiLoaderHttpModule } from 'ngx-ui-loader';
import { loaderConfig} from './preloader-config';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFireStorageModule, AngularFireStorage } from '@angular/fire/storage';

import { AdminMedalsComponent } from './admin/admin-medals/admin-medals.component';
import { MedalComponent } from './admin/admin-medals/medal/medal.component';
import { MedalListComponent } from './admin/admin-medals/medal-list/medal-list.component';
import { MedalService } from './shared/services/medal.service';
import { BanknoteService } from './shared/services/banknote.service';
import { AccessoryService } from './shared/services/accessory.service';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';


import { SearchCoinPipe } from './shared/pipes/searchCoin.pipe';
import { FilterYearPipe } from './shared/pipes/filter-year.pipe';
import { FilterSeriesPipe } from './shared/pipes/filter-series.pipe';
import { FilterDenominationPipe } from './shared/pipes/filter-denomination.pipe';
import { FilterMetalPipe } from './shared/pipes/filter-metal.pipe';
import { FilterPricePipe } from './shared/pipes/filter-price.pipe';
import { AngularFirestore } from '@angular/fire/firestore';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { CoinComponent } from './admin/admin-coins/coin/coin.component';
import { CoinListComponent } from './admin/admin-coins/coin-list/coin-list.component';
import { CoinService } from './shared/services/coin.service';
import { BanknoteListComponent } from './admin/admin-banknotes/banknote-list/banknote-list.component';
import { BanknoteComponent } from './admin/admin-banknotes/banknote/banknote.component';
import { AccessoryComponent } from './admin/admin-accessories/accessory/accessory.component';
import { AccessoryListComponent } from './admin/admin-accessories/accessory-list/accessory-list.component';
import { AdminPageComponent } from './admin/admin-page/admin-page.component';
import { AdminGuard } from './admin/admin.guard';
import { SignInComponent } from './pages/sign-in/sign-in.component';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    // HomeComponent,
    CoinsComponent,
    BanknotesComponent,
    MedalsComponent,
    BasketComponent,
    AccessoriesComponent,
    AdminComponent,
    AdminOrdersComponent,
    AdminCoinsComponent,
    AdminBanknotesComponent,
    AdminMedalsComponent,
    AdminAccessoriesComponent,
    SearchCoinPipe,
    FilterYearPipe,
    FilterSeriesPipe,
    FilterDenominationPipe,
    FilterMetalPipe,
    FilterPricePipe,
    MedalComponent,
    MedalListComponent,
    ProductDetailsComponent,
    CoinComponent,
    CoinListComponent,
    BanknoteComponent,
    BanknoteListComponent,
    AccessoryComponent,
    AccessoryListComponent,
    AdminPageComponent,
    SignInComponent
  

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxUiLoaderModule.forRoot(loaderConfig),
    NgxUiLoaderRouterModule,
    HttpClientModule,
    FormsModule,
    Angular2FontawesomeModule,
    ModalModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    Ng5SliderModule,
    CommonModule,
    BrowserAnimationsModule, 
    ToastrModule.forRoot(), TabsModule.forRoot()
  ],
  providers: [MedalService,CoinService,BanknoteService,AccessoryService, AngularFirestore,
    //  AdminGuard
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
