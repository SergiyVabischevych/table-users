import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of, Subject} from 'rxjs';
import {IAppState} from '../state/app.interfaces';
import {IUser} from '../components';
import {HttpClient} from '@angular/common/http';
import {delay} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppFetchDataService {

  constructor(
    private readonly http: HttpClient,
  ) {
  }

  getUser(): Observable<IUser> {
    return this.http.get<IUser>('https://v82tr0s6oa.execute-api.us-east-1.amazonaws.com/dev/');
  }

}
