import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
import { AutoCompleteModule } from 'ionic2-auto-complete';

@NgModule({
  declarations: [
    HomePage
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
    AutoCompleteModule
  ],
  exports: [
    HomePage
  ]
})
export class TutorialPageModule { }
