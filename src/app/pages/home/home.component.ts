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
    authUrl: string;
    hrefUrl: any;

    constructor ( private http: HttpCustormClient,
                  private router: Router, ) {
    }

    ngOnInit (): void {
        this.getUserInfo();
    }

    getUserInfo (): void {
        let loginKey = localStorage.getItem('loginKey');
        this.http.get(ServiceConfig.GETUSERINFO, ( res ) => {
            console.info(res);
            if ( res.code === 10000 ) {
                this.userInfo = res.data;
                if(loginKey !== 'true'){
                    this.thirdPartyBind();
                }
            }
            else {
                // this.toastr.showToast('danger', '', res.message);
            }
        })
    }

    thirdPartyBind (): void {
        this.http.get(ServiceConfig.RENDER + this.source + '?type=bind', ( res ) => {
            if ( res.code === 10000 ) {
                this.authUrl = res.data;
                // window.open(res.data + '?time='+((new Date()).getTime()));
                window.location.href = res.data + '?time='+((new Date()).getTime());
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
        this.router.navigate([ '/searchData' ]);
    }

    goDevice (): void {
        this.router.navigate([ '/device' ]);
    }

    purchasingOrder (): void {
        this.router.navigate([ '/purchas' ]);
    }


}
