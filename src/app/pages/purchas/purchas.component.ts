import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpCustormClient } from '../../providers/HttpClient';
import { ServiceConfig } from "../../providers/service.config";

@Component({
    selector: 'app-purchas',
    templateUrl: './purchas.component.html',
    styleUrls: [ './purchas.component.scss' ]
})
export class PurchasComponent implements OnInit{


    constructor (  private http: HttpCustormClient,
                   private router: Router, ) {
    }

    ngOnInit (): void {

    }

}
