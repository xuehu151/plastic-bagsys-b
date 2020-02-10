import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./pages/login/login.component";
import { PurchasComponent } from "./pages/purchas/purchas.component";
import { HomeComponent } from "./pages/home/home.component";
import { DeviceComponent } from "./pages/device/device.component";
import { SearchDataComponent } from "./pages/searchData/searchData.component";
import { WithdrawalComponent } from "./pages/withdrawal/withdrawal.component";
import { WithdrawalsRecordComponent } from "./pages/withdrawalsRecord/withdrawalsRecord.component";
import { PurchasHistoryComponent } from './pages/purchasHistory/purchasHistory.component';
import { PaymentComponent } from './pages/payment/payment.component';

const routes: Routes = [
        {
            path: 'login',
            component: LoginComponent
        },
        {
            path: 'device',
            component: DeviceComponent
        },
        {
            path: 'home',
            component: HomeComponent
        },
        {
            path: 'purchas',
            component: PurchasComponent
        },
        {
            path: 'searchData',
            component: SearchDataComponent
        },
        {
            path: 'withdrawal',
            component: WithdrawalComponent
        },
        {
            path: 'withdrawalsRecord',
            component: WithdrawalsRecordComponent
        },
        {
            path: 'purchasHistory',
            component: PurchasHistoryComponent
        },
        {
            path: 'payment',
            component: PaymentComponent
        },
        {
            path: '',
            redirectTo: 'login',
            pathMatch: 'full'
        },
        {   path: '**',
            redirectTo: 'login'
        },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {
}
