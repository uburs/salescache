import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as AppConst from '../app.const';

@Injectable({
    providedIn: 'root'
})
export class CommonService {
    baseUrl = AppConst.base_url; //'http://202.71.14.224:8180/SalesCache/api/';
    constructor(public http: HttpClient, public router: Router) {
    }
    //this method includes the base URL but if you need each function
    //to come from separate lambdas then you need to remove the baseURL
    get(url, data = {}) {
        var headers = new HttpHeaders();
        if (localStorage.getItem('token')) {
            headers = headers.set('authorization', localStorage.getItem('token'));
        }

        return new Promise<any>((resolve, reject) => {
            var headers = new HttpHeaders();
            if (localStorage.getItem('token')) {
                headers = headers.set('authorization', localStorage.getItem('token'));
            }
            let config = {
                headers: headers
            }
            this.http.get(this.baseUrl + url, config).subscribe((result: any) => {
                resolve(result)
            }, (error) => {
                reject(error)
            })
        })
    }

    //this gets just the URL itself without combining baseURL
    getLambda(url, data = {}) {
        var headers = new HttpHeaders();
        if (localStorage.getItem('token')) {
            headers = headers.set('authorization', localStorage.getItem('token'));
        }

        return new Promise<any>((resolve, reject) => {
            var headers = new HttpHeaders();
            if (localStorage.getItem('token')) {
                headers = headers.set('authorization', localStorage.getItem('token'));
            }
            let config = {
                headers: headers
            }
            this.http.get(url, config).subscribe((result: any) => {
                resolve(result)
            }, (error) => {
                reject(error)
            })
        })
    }

    getPostFeeds(url, data = {}) {
      
        return new Promise<any>((resolve, reject) => {
            var headers = new HttpHeaders();
            if (localStorage.getItem('token')) {
                //headers = headers.set('authorization', localStorage.getItem('token'));
            }
            //headers = headers.set('Accept', 'text/plain');
            this.http.get(url, {headers: headers, responseType: 'text'}).subscribe((result: any) => {
                resolve(result)
            }, (error) => {
                reject(error)
            })
        })
    }
    
    post(url, data = {}) {
        var headers = new HttpHeaders();
        if (localStorage.getItem('token')) {
            headers = headers.set('authorization', localStorage.getItem('token'));
        }

        return new Promise<any>((resolve, reject) => {
            this.http.post(this.baseUrl + url, data, { headers: headers }).subscribe((result: any) => {
                resolve(result)
            }, (error) => {
                reject(error)
            })
        })
    }
}