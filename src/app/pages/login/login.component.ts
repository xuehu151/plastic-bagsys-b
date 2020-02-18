import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpCustormClient } from '../../providers/HttpClient';
import { ServiceConfig } from "../../providers/service.config";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: [ './login.component.scss' ]
})

export class LoginComponent implements OnInit{
    username: string = '';
    password: string = '';


    constructor (  private http: HttpCustormClient,
                   private router: Router, ) {
    }

    ngOnInit (): void {
        let url = location.search;
        if(url){
            let token = url.split('?')[1].split('=')[1];
            localStorage.setItem('loginKey', 'true');
            localStorage.setItem('token', token);
            this.router.navigate([ '/home' ]);
        }
    }

    login(): void{
        this.http.post(ServiceConfig.LOGIN, {
            username: this.username,
            password: this.password
        }, ( res ) => {
            if ( res.code === 10000 ) {
                localStorage.removeItem('loginKey');
                localStorage.setItem('isLogin', 'true');
                localStorage.setItem('token', res.data.token);
                this.router.navigate([ '/home' ]);
            }
            else {
                // this.errInfo = res.message;
            }
        })
    }

    clearForm(num): void{
        if(num === 1){
            this.username = '';
        }
        else {
            this.password = '';
        }
    }
}
