import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { PickupModal } from './pickup';

@NgModule({
  declarations: [
    PickupModal
  ],
  exports: [
    PickupModal
  ]
})
export class PickupModule { }
