import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserDetailsComponent} from './user-details.component';

@NgModule({
  imports: [CommonModule],
  declarations: [UserDetailsComponent],
  exports: [UserDetailsComponent],
})
export class UserDetailsModule {}
