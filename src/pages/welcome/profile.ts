import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { ModalController, ViewController } from 'ionic-angular';

@Component({
  selector: 'profile-modal',
  templateUrl: 'profile.html'
})
export class ProfileModal {

 constructor(public viewCtrl: ViewController) {

 }

 dismiss() {
   let data = { 'foo': 'bar' };
   this.viewCtrl.dismiss(data);
 }

}
