import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InputRangeComponent} from './input-range.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [ InputRangeComponent ],
  exports: [ InputRangeComponent ],
})
export class InputRangeModule {}
