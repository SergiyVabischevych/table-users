import {Injectable} from '@angular/core';
import {AppFetchDataService} from './app-fetch-data.service';
import {AppDataStoreService} from './app-data-store.service';
import {combineLatest, interval, Subject, Subscription} from 'rxjs';
import {delay, distinctUntilChanged, filter, tap, withLatestFrom} from 'rxjs/operators';
import {IAppState} from '../state';
import {IUser} from '../components';

@Injectable({
  providedIn: 'root',
})
export class AppCoreService {

  private readonly goToFetchUserData = new Subject<void>();
  private subscription: Subscription;

  constructor(
    private readonly appFetchDataService: AppFetchDataService,
    private readonly appDataStoreService: AppDataStoreService,
  ) {
    combineLatest([
      this.appDataStoreService.getTotalUsers$(),
      this.goToFetchUserData.asObservable(),
    ])
      .pipe(
        withLatestFrom(this.appDataStoreService.getSelectedUser$()),
        filter(([[{totalUsers}], { selectedUser }]: [[Partial<IAppState>, void], Partial<IAppState>]) => totalUsers > 0 && !selectedUser),
        tap(() => this.appDataStoreService.setUsers({ users: [] })),
      )
      .subscribe(([[{totalUsers}]]: [[Partial<IAppState>, void], Partial<IAppState>]) => {
        this.appDataStoreService.setDataLoading(true);

        let delayTime = 0;
        const users: IUser[] = [];

        const delayOffset = 1000 / 4;
        for (let i = 0; i < totalUsers; i++) {
          this.appFetchDataService
            .getUser()
            .pipe(delay(delayTime))
            .subscribe(
              (user: IUser) => users.push(user),
              () => users.push(null), // handle error
              () => {
                if (users.length === totalUsers) {
                  this.appDataStoreService.setUsers({ users: users.filter(u => !!u)});
                  this.appDataStoreService.setDataLoading(false);
                }
              }
            );

          delayTime += delayOffset;
        }
      });

    // if data loading need stop interval else - run interval
    combineLatest([
      this.appDataStoreService.isDataLoading$().pipe(distinctUntilChanged()),
      this.appDataStoreService.getSelectedUser$().pipe(distinctUntilChanged()),
    ])
      .subscribe(([{ isDataLoading}, { selectedUser }]: [Partial<IAppState>, Partial<IAppState>]) => {
        if (isDataLoading || selectedUser) {
          this.subscription && this.subscription.unsubscribe();
          this.subscription = undefined;
        } else {
          this.run();
        }
      });
  }

  runApp(): void {
    this.goToFetchUserData.next();
    this.run();
  }

  private run(): void {
    if (this.subscription) {
      return;
    }

    this.subscription = interval(10000)
      .subscribe((d) => {
        this.goToFetchUserData.next();
      });
  }

}
