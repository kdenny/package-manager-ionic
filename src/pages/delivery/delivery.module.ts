import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DeliveryPage } from './delivery';
import { AutoCompleteModule } from 'ionic2-auto-complete';



@NgModule({
  declarations: [
    DeliveryPage,
  ],
  imports: [
    AutoCompleteModule,
    IonicPageModule.forChild(DeliveryPage),
  ],
})
export class DeliveryModule {}
