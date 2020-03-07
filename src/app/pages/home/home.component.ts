import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpCustormClient } from '../../providers/HttpClient';
import { ServiceConfig } from '../../providers/service.config';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: [ './home.component.scss' ]
})

export class HomeComponent implements OnInit {
    userInfo: any;
    source: string = 'wechatMp';
    loading: boolean = false;
    loadingText: string = '授权中...';
    authUrl: string;

    constructor ( private http: HttpCustormClient,
                  private router: Router, ) {
    }

    ngOnInit (): void {
        this.authUrl = location.search;
        this.getUserInfo();
        let loginKey = localStorage.getItem('loginKey');
        if ( loginKey !== 'true' ) {
            this.http.get(ServiceConfig.RENDER + this.source + '?type=bind', ( res ) => {
                if ( res.code === 10000 ) {
                    // window.location.href = res.data + '&time=' + (new Date()).getTime();
                    window.location.href = res.data + '&time=' + (new Date()).getTime();
                }
            })
        }
    }

    getUserInfo (): void {
        this.http.get(ServiceConfig.GETUSERINFO, ( res ) => {
            if ( res.code === 10000 ) {
                this.userInfo = res.data;
            }
        })
    }

    /* GetRequest () {
     let url = window.location.search;
     console.info('*********',url);
     let theRequest = {};
     if ( url.indexOf("?") != -1 ) {
     let str = url.substr(1);
     let strs = str.split("&");
     for ( let i = 0; i < strs.length; i++ ) {
     theRequest[ strs[ i ].split("=")[ 0 ] ] = unescape(strs[ i ].split("=")[ 1 ]);
     }
     }
     return theRequest;
     }*/

    searchData (): void {
        if( this.authUrl ){
            this.router.navigate([ '/searchData' ]);
        }
        else {
            alert('授权中...');
        }
    }

    goDevice (): void {
        if( this.authUrl ){
            this.router.navigate([ '/device' ]);
        }
        else {
            alert('授权中...');
        }
    }

    purchasingOrder (): void {
        if( this.authUrl ){
            this.router.navigate([ '/purchas' ]);
        }
        else {
            alert('授权中...');
        }
    }


}
