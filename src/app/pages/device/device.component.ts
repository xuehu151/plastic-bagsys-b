import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpCustormClient } from '../../providers/HttpClient';
import { ServiceConfig } from "../../providers/service.config";

@Component({
    selector: 'app-device',
    templateUrl: './device.component.html',
    styleUrls: [ './device.component.scss' ]
})
export class DeviceComponent implements OnInit{

    constructor ( private http: HttpCustormClient,
                  private router: Router, ) {
    }

    ngOnInit (): void {
    }



}
