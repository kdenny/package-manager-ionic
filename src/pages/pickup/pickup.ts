import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { ModalController, ViewController, NavParams } from 'ionic-angular';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import {Api} from '../../providers/api/api';

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
  isSigned = false;

  @ViewChild(SignaturePad) signaturePad: SignaturePad;
  private signaturePadOptions: Object = { // Check out https://github.com/szimek/signature_pad
    'minWidth': 2,
    'canvasWidth': 400,
    'canvasHeight': 200,
    'backgroundColor': '#f6fbff',
    'penColor': '#666a73'
  };

 constructor(public viewCtrl: ViewController, public navParams: NavParams, public api: Api) {
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
   console.log(this.selectedPackages)
   this.api.addPickup(this.selectedPackages).then(data => {
     this.viewCtrl.dismiss(data);
   });
 }

 enterConfirm() {
   this.confirmMode = true;
 }

 drawComplete() {
   this.isSigned = true;
 }

}
