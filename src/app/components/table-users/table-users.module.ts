import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TableUsersComponent} from './table-users.component';

@NgModule({
  imports: [CommonModule],
  declarations: [TableUsersComponent],
  exports: [TableUsersComponent],
})
export class TableUsersModule {}
