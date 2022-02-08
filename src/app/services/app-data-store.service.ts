import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {IAppState} from '../state';
import {IUser} from '../components';

@Injectable({
  providedIn: 'root'
})
export class AppDataStoreService {

  private readonly users$ = new BehaviorSubject<Partial<IAppState>>({
    users: [],
  });

  private readonly isUserLoading$ = new BehaviorSubject<Partial<IAppState>>({
    isDataLoading: false,
  });

  private readonly selectedUser$ = new BehaviorSubject<Partial<IAppState>>({
    selectedUser: null,
  });

  private readonly totalUsers$ = new BehaviorSubject<Partial<IAppState>>({
    totalUsers: 0,
  });

  isDataLoading$(): Observable<Partial<IAppState>> {
    return this.isUserLoading$.asObservable();
  }

  setDataLoading(isDataLoading: boolean): void {
    this.isUserLoading$.next({ isDataLoading });
  }

  getUsers$(): Observable<Partial<IAppState>> {
    return this.users$.asObservable();
  }

  setUsers(users: Partial<IAppState>): void {
    this.users$.next(users);
  }

  getSelectedUser$(): Observable<Partial<IAppState>> {
    return this.selectedUser$.asObservable();
  }

  setSelectedUser(selectedUser: IUser): void {
    this.selectedUser$.next({ selectedUser });
  }

  getTotalUsers$(): Observable<Partial<IAppState>> {
    return this.totalUsers$.asObservable();
  }

  setTotalUsers(totalUsers: number): void {
    this.totalUsers$.next({ totalUsers });
  }

}
