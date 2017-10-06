
import {AutoCompleteService} from 'ionic2-auto-complete';
import { Http } from '@angular/http';
import {Injectable} from "@angular/core";
import 'rxjs/add/operator/map';
import {Api} from '../api/api';


@Injectable()
export class ApartmentFilterService implements AutoCompleteService {
  labelAttribute = "number";
  selectedApartment;
  searchText = null;


  constructor(private http:Http, public api: Api) {

  }

  getResults(keyword:string) {
    this.searchText = keyword;
    if (keyword != '' && keyword != ' ') {
      this.api.newPackages = this.api.packages.filter(item => item['apartment_no']['number'].startsWith(keyword) || item['recipient']['name'].startsWith(keyword));
    }
    else {
      this.searchText = null;
      this.api.newPackages = null;
    }

    return [];

    //return this.http.get("http://127.0.0.1:8000/apartments/").map(result =>
    //    result.json().filter(item => item['number'].startsWith(keyword) )
    //    );

  }

  filterResults(results, keyword:string) {

    return results
        .filter(item => item['apartment_no']['number'].startsWith(keyword) || item['recipient']['name'].startsWith(keyword));
  }
}

