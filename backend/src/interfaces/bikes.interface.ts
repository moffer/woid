import { User } from '@interfaces/users.interface';

export interface Bike {
  id: string;
  createdAt: Date;
  updatedAt: Date;

  description: string;
  color: string;
  currentLocationLang: number;
  currentLocationLong: number;

  owner: User;
}
