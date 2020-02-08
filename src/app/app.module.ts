import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { APP_BASE_HREF } from '@angular/common';
import { HttpCustormClient } from './providers/HttpClient';
import { HttpClientModule } from '@angular/common/http';

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

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        PurchasComponent,
        HomeComponent,
        DeviceComponent,
        SearchDataComponent,
        WithdrawalComponent,
        WithdrawalsRecordComponent,

        FloatNumberPipe,
    ],
    imports: [
        CommonModule,
        BrowserModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,

        AppRoutingModule,
        RouterModule.forRoot()
    ],
    providers: [
        HttpCustormClient,
        { provide: APP_BASE_HREF, useValue: '/' }
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule {
}
