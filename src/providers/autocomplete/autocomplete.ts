
import {AutoCompleteService} from 'ionic2-auto-complete';
import { Http } from '@angular/http';
import {Injectable} from "@angular/core";
import 'rxjs/add/operator/map';
import {Api} from '../api/api';


@Injectable()
export class ApartmentAutocompleteService implements AutoCompleteService {
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

    return this.http.get("http://packagerat.pythonanywhere.com/apartments/").map(result =>
        result.json().filter(item => item['number'].startsWith(keyword)));

        //result.json().filter(item => item['number'].startsWith(keyword) || item['residents'][0]['name'].startsWith(keyword)));

  }

  filterResults(results, keyword:string) {

    return results
        .filter(item => item['apartment_no']['number'].startsWith(keyword) || item['recipient']['name'].startsWith(keyword));
  }
}

