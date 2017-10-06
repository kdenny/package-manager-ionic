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
  url: string = 'https://example.com/api/v1';
  packages = [];
  newPackages = null;

  constructor(public http: Http) {
  }

  get(endpoint: string, params?: any, options?: RequestOptions) {
    if (!options) {
      options = new RequestOptions();
    }

    // Support easy query params for GET requests
    if (params) {
      let p = new URLSearchParams();
      for (let k in params) {
        p.set(k, params[k]);
      }
      // Set the search field if we have params and don't already have
      // a search field set in options.
      options.search = !options.search && p || options.search;
    }

    return this.http.get(this.url + '/' + endpoint, options);
  }

  post(endpoint: string, body: any, options?: RequestOptions) {
    return this.http.post(this.url + '/' + endpoint, body, options);
  }

  addPackages(body: any) {
    let postUrl = 'http://packagerat.pythonanywhere.com/packages/';
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let poptions = new RequestOptions({ headers: headers });

    let newPackages;

    return this.http.post(postUrl, body, poptions).toPromise()
      .then(response => newPackages = response.json())
      .catch(this.handleError);
  }

  getPackages() {
    let packagesUrl = 'https://packagerat.pythonanywhere.com/packages/';
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let poptions = new RequestOptions({ headers: headers });

    let p2;

    return this.http.get(packagesUrl, poptions).toPromise()
      .then(response => p2 = response.json())
      .then();
  }

  getPackagesByApartment(apartment_no) {
    let packagesUrl = 'https://packagerat.pythonanywhere.com/packages/' + apartment_no;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let poptions = new RequestOptions({ headers: headers });

    let p2;

    return this.http.get(packagesUrl, poptions).toPromise()
      .then(response => p2 = response.json());
  }

  put(endpoint: string, body: any, options?: RequestOptions) {
    return this.http.put(this.url + '/' + endpoint, body, options);
  }

  delete(endpoint: string, options?: RequestOptions) {
    return this.http.delete(this.url + '/' + endpoint, options);
  }

  patch(endpoint: string, body: any, options?: RequestOptions) {
    return this.http.put(this.url + '/' + endpoint, body, options);
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
