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

    constructor ( private http: HttpCustormClient,
                  private router: Router, ) {
    }

    ngOnInit (): void {
        this.getUserInfo();
        let loginKey = localStorage.getItem('loginKey');
        if(loginKey !== 'true'){
            this.http.get(ServiceConfig.RENDER + this.source + '?type=bind', ( res ) => {
                if ( res.code === 10000 ) {
                    // window.location.href = res.data + '&time=' + (new Date()).getTime();
                    // window.location.href = res.data + '&time=' + (new Date()).getTime();
                    window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx0b31bcd6cbe880a4&redirect_uri=http://academy.home.tbol.xiuzhenyuan.cn/&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect';
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
        this.router.navigate([ '/searchData' ]);
    }

    goDevice (): void {
        this.router.navigate([ '/device' ]);
    }

    purchasingOrder (): void {
        this.router.navigate([ '/purchas' ]);
    }


}
