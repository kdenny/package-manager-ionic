import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { Http, RequestOptions, URLSearchParams, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';

//import {ApartmentAutocompleteService} from '../autocomplete/autocomplete';

/**
 * Api is a generic REST Api handler. Set your API url first.
 */
@Injectable()
export class Api {
  url: string = 'http://packagerat.pythonanywhere.com/';
  //url: string = 'http://127.0.0.1:8000/';
  packages = [];
  newPackages = null;

  constructor(public http: Http) {
  }

  addPackages(body: any) {
    let postUrl = this.url + 'packages/';
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let poptions = new RequestOptions({ headers: headers });

    let newPackages;

    return this.http.post(postUrl, body, poptions).toPromise()
      .then(response => newPackages = response.json())
      .catch(this.handleError);
  }

  getPackages() {
    let packagesUrl = this.url + 'packages/';
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let poptions = new RequestOptions({ headers: headers });

    let p2;

    return this.http.get(packagesUrl, poptions).toPromise()
      .then(response => p2 = response.json())
      .then();
  }

  getPackagesByApartment(apartment_no) {
    let packagesUrl = this.url + 'packages/' + apartment_no;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let poptions = new RequestOptions({ headers: headers });

    let p2;

    return this.http.get(packagesUrl, poptions).toPromise()
      .then(response => p2 = response.json());
  }

  addPickup(body) {
    let packagesUrl = this.url + 'package_pickup/';
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let poptions = new RequestOptions({ headers: headers });

    let p2;

    return this.http.post(packagesUrl, body, poptions).toPromise()
      .then(response => p2 = response.json());
  }


  private handleError (error: any) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
}
