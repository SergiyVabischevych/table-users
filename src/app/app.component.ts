import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {AppCoreService, AppDataStoreService} from './services';
import {Observable} from 'rxjs';
import {IAppState} from './state';
import {IUser} from './components';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {

  readonly users$: Observable<Partial<IAppState>> = this.dataStoreService.getUsers$();
  readonly totalUsers$: Observable<Partial<IAppState>> = this.dataStoreService.getTotalUsers$();
  readonly isDataLoading$: Observable<boolean> = this.dataStoreService.isDataLoading$().pipe(map(({isDataLoading}) => isDataLoading));
  readonly selectedUser$: Observable<IUser> = this.dataStoreService.getSelectedUser$().pipe(map(({selectedUser}) => selectedUser));

  constructor(
    private readonly appCoreService: AppCoreService,
    private readonly dataStoreService: AppDataStoreService,
  ) {
  }

  ngOnInit(): void {
    this.appCoreService.runApp();
  }

  onRangeValueChanged(value: number): void {
    this.dataStoreService.setTotalUsers(value);
  }

  onSelectUser(user: IUser): void {
    this.dataStoreService.setSelectedUser(user);
  }

  onCloseModal(): void {
    this.dataStoreService.setSelectedUser(undefined);
  }

}
