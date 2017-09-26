import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ApartmentAutocompleteService } from '../../providers/autocomplete/autocomplete';
import {Api} from '../../providers/api/api';



@IonicPage()
@Component({
  selector: 'page-delivery',
  templateUrl: 'delivery.html',
})
export class DeliveryPage {


  private deliveryForm : FormGroup;
  public imgUrl;
  public deliveries = [];
  public selectedResident;
  public packageType;
  public packageTypes = [
    'Small Box',
    'Large Box',
    'Envelope'
  ]

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, public autocomplete: ApartmentAutocompleteService, public api: Api) {
    this.imgUrl = 'assets/img/westlofts-logo.png'
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Delivery');
  }

  logForm(){
    let newDelivery = {
      'apartment_no': this.autocomplete.selectedApartment.number,
      'recipient' : this.autocomplete.selectedApartment.residents[this.selectedResident].id,
      'resident': this.autocomplete.selectedApartment.residents[this.selectedResident],
      'package_type': this.packageType,
      'status': 'pending'
    }
    console.log(newDelivery)

    this.deliveries.push(newDelivery)
    this.autocomplete.selectedApartment = null;
    this.selectedResident = null;
    this.packageType = null;
  }

  itemSelected(event) {
    this.autocomplete.selectedApartment = event;
  }

  postDeliveries() {
    this.api.addPackages(this.deliveries).then(
      data => (this.deliveries = [])
    );

  }

}
