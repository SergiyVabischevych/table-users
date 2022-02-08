import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {IUser} from './table-users.interfaces';

@Component({
  selector: 'app-table-users',
  templateUrl: './table-users.component.html',
  styleUrls: ['./table-users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableUsersComponent {

  @Input() users: IUser[];

  @Output() selectUser = new EventEmitter<IUser>();

  onSelectUser(user: IUser): void {
    this.selectUser.emit(user);
  }

}
