import { User } from '@interfaces/users.interface';
import { Bike } from '@interfaces/bikes.interface';

export interface Rental {
  id: string;
  createdAt: Date;
  updatedAt: Date;

  start: Date;
  end: Date;
  dropLang: number;
  dropLong: number;
  pickUpLang: number;
  pickUpLong: number;

  renter: User;
  bike: Bike;
}
