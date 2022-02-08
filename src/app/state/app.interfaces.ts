import {IUser} from '../components';

export interface IAppState {
  users: IUser[];
  selectedUser: IUser;
  totalUsers: number;
  isDataLoading: boolean;
}
