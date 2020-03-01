import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpCustormClient } from '../../providers/HttpClient';
import { ServiceConfig } from "../../providers/service.config";
import * as echarts from 'echarts';

@Component({
    selector: 'app-device',
    templateUrl: './device.component.html',
    styleUrls: [ './device.component.scss' ]
})
export class DeviceComponent implements OnInit {
    barChartInstance: any;
    anomalyList: Array<any> = [];
    anomalyStatusCount: number = 0;
    deviceTotal: number = 0;
    normalStatusCount: number = 0;

    constructor ( private http: HttpCustormClient,
                  private router: Router, ) {
    }

    ngOnInit (): void {
        this.getDeviceList();
        this.barChartInstance = echarts.init(document.getElementById('echarts-left'));
    }

    getDeviceList (): void {
        this.http.get(ServiceConfig.MYDEVICELIST, ( res ) => {
            // console.info(res);
            if ( res.code === 10000 ) {
                this.anomalyList = res.data.anomalyList;
                this.deviceTotal = res.data.deviceTotal;
                this.normalStatusCount = res.data.normalStatusCount;
                this.anomalyStatusCount = res.data.anomalyStatusCount;
                this.getEcharts(this.normalStatusCount, this.anomalyStatusCount);
            }
        })
    }

    getEcharts ( normalStatusCount, anomalyStatusCount ) {
        let chartOption = {
            // legend: {
            //     orient: 'vertical',
            //     right: 10,
            //     top:10,
            //     itemGap: 30,
            //     itemWidth: 14,
            //     formatter: function(name) {
            //         if(name === '正常运行') {
            //             return name + '\n\n' + normalStatusCount;
            //         } else if(name === '异常状态') {
            //             return name + '\n\n' + anomalyStatusCount;
            //         }
            //     },
            //     data: ['正常运行', '异常状态']
            // },
            color: [ '#2a7ffb', '#fece00' ],
            series: [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius: [ '40%', '70%' ],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: false,
                            position: 'left'
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '16',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data: [
                        { value: this.normalStatusCount, name: '正常运行' },
                        { value: this.anomalyStatusCount, name: '异常状态' },
                    ]
                }
            ]
        };
        this.barChartInstance.setOption(chartOption);
    }

}
