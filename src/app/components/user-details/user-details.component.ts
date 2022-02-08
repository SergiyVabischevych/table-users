import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {IUser} from '../table-users/table-users.interfaces';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDetailsComponent {

  @Input() user: IUser;

}
