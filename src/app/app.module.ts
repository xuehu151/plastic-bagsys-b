import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpCustormClient } from './providers/HttpClient';
import { HttpClientModule } from '@angular/common/http';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app-routing.module";
import { LoginComponent } from "./pages/login/login.component";
import { PurchasComponent } from "./pages/purchas/purchas.component";
import { HomeComponent } from "./pages/home/home.component";
import { DeviceComponent } from "./pages/device/device.component";
import { SearchDataComponent } from "./pages/searchData/searchData.component";
import { WithdrawalComponent } from "./pages/withdrawal/withdrawal.component";
import { WithdrawalsRecordComponent } from "./pages/withdrawalsRecord/withdrawalsRecord.component";
import { FloatNumberPipe } from './common/pipes';
import { DifferentCardPipe } from './common/pipes';
import { PurchasHistoryComponent } from './pages/purchasHistory/purchasHistory.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { KeepTwoDecimalService } from './providers/floatNumberService';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        PurchasComponent,
        PurchasHistoryComponent,
        HomeComponent,
        DeviceComponent,
        SearchDataComponent,
        WithdrawalComponent,
        WithdrawalsRecordComponent,
        PaymentComponent,

        FloatNumberPipe,
        DifferentCardPipe,
    ],
    imports: [
        CommonModule,
        BrowserModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,

        AppRoutingModule,
        RouterModule.forRoot([])
    ],
    providers: [
        HttpCustormClient,
        KeepTwoDecimalService,
        {
            provide: LocationStrategy,
            useClass: HashLocationStrategy
        },
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule {
}
