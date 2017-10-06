import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { ModalController, ViewController, NavParams } from 'ionic-angular';

@Component({
  selector: 'pickup-modal',
  templateUrl: 'pickup.html'
})
export class PickupModal {
  packages;
  apartment_no;
  selectedPackages = [];
  selectedByType = {};
  ptypes = [];
  confirmMode = false;

 constructor(public viewCtrl: ViewController, public navParams: NavParams) {
   this.packages = this.navParams.get('packages');
   this.apartment_no = this.navParams.get('apartment_no');
   this.packages.map(pack => {
     pack.selected = false
   })
   console.log(this.packages)

 }

 selectPackage(pack) {
   this.selectedPackages.push(pack);
   if (this.selectedByType[pack.package_type]) {
     this.selectedByType[pack.package_type].push(pack);
   }
   else {
     this.ptypes.push(pack.package_type);
     this.selectedByType[pack.package_type] = [];
     this.selectedByType[pack.package_type].push(pack);
   }
   console.log(this.selectedByType)
 }

 dismiss() {
   let data = { 'foo': 'bar' };
   this.viewCtrl.dismiss(data);
 }

 enterConfirm() {
   this.confirmMode = true;
 }

}
