import { Component, OnInit } from '@angular/core';
import { IonicPage, MenuController, NavController, ModalController, Platform } from 'ionic-angular';

import { TranslateService } from '@ngx-translate/core';
import { ApartmentAutocompleteService } from '../../providers/autocomplete/autocomplete';
import { ApartmentFilterService } from '../../providers/autocomplete/filter';

import { Api } from '../../providers/api/api';
import { PickupModal } from '../pickup/pickup';


@IonicPage()
@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html'
})

export class TutorialPage implements OnInit{
  slide: {};
  showSkip = true;
  dir: string = 'ltr';
  mode: string = null;
  isPickup = false;
  isDelivery = false;
  searchText;
  currentPackages = [];

  constructor(public navCtrl: NavController, public menu: MenuController, translate: TranslateService,
              public modalCtrl: ModalController,
              public platform: Platform, public autocomplete: ApartmentAutocompleteService, public api: Api, public filter: ApartmentFilterService) {
    this.dir = platform.dir();
    this.autocomplete.selectedApartment = null;
    this.slide =
          {
            title: "Welcome to the Package Inventory System",
            image: 'assets/img/westlofts-logo.png',
          }
        ;
  }

  startApp() {
    this.navCtrl.setRoot('WelcomePage', {}, {
      animate: true,
      direction: 'forward'
    });
  }

  ngOnInit() {
    this.api.getPackages().then(
        results => {
          this.api.packages = results;
          console.log(results)
        }
    )
  }

  recordDelivery() {
    this.mode = 'delivery';
    console.log(this.mode)
    this.navCtrl.setRoot('DeliveryPage', {}, {
            animate: true,
            direction: 'forward'
          });
  }

  recordPickup(apartment) {

    this.api.getPackagesByApartment(apartment).then(data => {
       let pickupModal = this.modalCtrl.create(PickupModal,
         {
           packages: data,
           apartment_no: apartment
         }
       );
       pickupModal.onDidDismiss(data => {
         this.api.packages = data;
       });
       pickupModal.present();
    })

  }

  onChange(event) {
    this.autocomplete.searchText = event.target.value;
    console.log(this.searchText)
    //if (this.searchText != '' && this.searchText != ' ') {
    //    this.currentPackages = this.autocomplete.filterResults(this.autocomplete.packages, this.searchText);
    //    console.log(this.currentPackages)
    //}
    //else {
    //  this.currentPackages = null;
    //}
  }


  itemSelected(event) {
    this.autocomplete.selectedApartment = event;
    if (this.mode == 'delivery') {
      this.navCtrl.setRoot('DeliveryPage', {}, {
        animate: true,
        direction: 'forward'
      });
    }
    if (this.mode == 'pickup') {
      this.navCtrl.setRoot('WelcomePage', {}, {
        animate: true,
        direction: 'forward'
      });
    }
  }

  ionViewDidEnter() {
    // the root left menu should be disabled on the tutorial page
    this.menu.enable(false);
  }

  ionViewWillLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menu.enable(true);
  }

}
