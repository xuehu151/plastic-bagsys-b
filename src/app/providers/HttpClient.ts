import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Router } from '@angular/router';
import { ServiceConfig } from './service.config';

@Injectable()
export class HttpCustormClient {
    URL : string;

    constructor ( public http: HttpClient,
                  private router: Router ) {
        this.URL = ServiceConfig.APIBASE;
    }

    public getJson ( url, cb?: Function ) {
        this.http.get(url)
            .subscribe(data => {
                cb(data);
            }, error => {
                this.handleSubscribeError(error);
            });
    }

    public get ( url, cb?: Function ) {
        let URL = this.URL + url;
        // console.log('get开始请求URL', URL);
        const TOKEN = localStorage.getItem('token');
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        };
        this.http.get(URL, { headers: httpOptions.headers.append('X-Auth-Token', TOKEN) })
            .subscribe(res => {
                // console.log('get请求结束', data);
                this.tokenExpired(res, cb);
            }, error => {
                this.handleSubscribeError(error);
            });
    }

    /*
     * @param url地址
     * @param headers可选参数设置头
     */
    getFile ( url, cb?: Function ) {
        let URL = this.URL + url;

        // console.info(URL);
        const TOKEN = localStorage.getItem('token');
        const headers = {
            headers: new HttpHeaders()
        };
        this.http.get(URL, {
                headers: headers.headers.append('X-Auth-Token', TOKEN),
                observe: 'response',
                responseType: 'blob'
            })
            .subscribe(res => {
                this.tokenExpired(res, cb);
            }, ( error: any ) => {
                this.handleSubscribeError(error);
            });
    }

    downloadFile ( data: HttpResponse<Blob>, name: string ) {
        const file = new Blob([ data.body ], { type: 'application/zip,application/octet-stream' });
        const a = document.createElement('a');
        a.id = 'tempId';
        document.body.appendChild(a);
        a.download = name;
        a.href = URL.createObjectURL(file);
        a.click();
        const tempA = document.getElementById('tempId');
        if ( tempA ) {
            tempA.parentNode.removeChild(tempA);
        }
    }

    /*
     * @param url地址
     * @param options提交的数据
     * @param myheaders可选参数设置头
     * @title:封装一个post请求数据的
     */
    public post ( url, data?: Object, cb?: Function ) {
        let URL = this.URL + url;
        // console.info(URL)
        const TOKEN = localStorage.getItem('token');
        const ISLOGIN = localStorage.getItem('isLogin');
        const headers = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        };
        if ( ISLOGIN == 'true' ) {
            this.getPost(URL, data, cb, { headers: headers.headers.append('X-Auth-Token', TOKEN) });
        }
        else {
            this.router.navigate([ '/login' ]);
            this.getPost(URL, data, cb);
        }
    }

    public getPost ( URL, data, cb, options? ) {
        this.http.post(URL, data, options)
            .subscribe(res => {
                // console.log('post请求结束', res);
                this.tokenExpired(res, cb);
            }, error => {
                this.handleSubscribeError(error);
            });
    }

    public put ( url: string, data?: Object, cb?: Function, options?: Object ) {
        let URL = this.URL + url;

        // console.log('put:start');
        const TOKEN = localStorage.getItem('token');
        const headers = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        };

        this.http.put(URL, data, { headers: headers.headers.append('X-Auth-Token', TOKEN) })
            .subscribe(( res: any ) => {
                // console.log('put:end', res);
                this.tokenExpired(res, cb);
            }, error => {
                this.handleSubscribeError(error);
            });
    }

    public delete ( url, cb?: Function, options?: Object ) {
        let URL = this.URL + url;

        // console.info('请求地址:' + url);
        const TOKEN = localStorage.getItem('token');
        const headers = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        };
        this.http.delete(URL, { headers: headers.headers.append('X-Auth-Token', TOKEN) })
            .subscribe(( res: any ) => {
                // console.log('put:end', res);
                this.tokenExpired(res, cb);
            }, error => {
                this.handleSubscribeError(error);
            });
    }

    private tokenExpired(res, cb:Function){  //优化token过期逻辑
        if(res['code'] === 10000){
            cb(res);
        }else {
            localStorage.clear();
            setTimeout( () => {
                this.router.navigate(['/login']);
            }, 1000 * 2);
        }
    }

    private handleSubscribeError ( error: any ) {
        const TOKEN = localStorage.getItem('token');
        if ( error.status === 401 || !TOKEN ) {
            localStorage.clear();
            this.router.navigate(['/login']);
        }
        console.info('origin error: ', error);
        alert('网络请求出错!')
    }
}
