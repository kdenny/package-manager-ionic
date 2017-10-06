import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TutorialPage } from './tutorial';
import { TranslateModule } from '@ngx-translate/core';
import { AutoCompleteModule } from 'ionic2-auto-complete';

@NgModule({
  declarations: [
    TutorialPage
  ],
  imports: [
    IonicPageModule.forChild(TutorialPage),
    TranslateModule.forChild(),
    AutoCompleteModule
  ],
  exports: [
    TutorialPage
  ]
})
export class TutorialPageModule { }
