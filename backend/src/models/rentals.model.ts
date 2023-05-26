import { Sequelize, Model, DataTypes, Optional } from 'sequelize';
import { Bike } from '@interfaces/bikes.interface';
import { User } from '@interfaces/users.interface';
import { Rental } from '@interfaces/rentals.interface';
import { DataTypeUUIDv4 } from 'sequelize';

export type RentalsCreationAttributes = Optional<
  Rental,
  'id' | 'start' | 'end' | 'pickUpLang' | 'pickUpLong' | 'dropLang' | 'dropLong' | 'renter' | 'bike' | 'createdAt' | 'updatedAt'
>;

export class RentalModel extends Model<Rental, RentalsCreationAttributes> implements Rental {
  public id: DataTypeUUIDv4;

  public start: Date;
  public end: Date;
  public dropLang: number;
  public dropLong: number;
  public pickUpLang: number;
  public pickUpLong: number;

  public renter: User;
  public bike: Bike;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof RentalModel {
  RentalModel.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUIDV4,
      },
      start: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
      end: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
      renter: {
        allowNull: false,
        type: DataTypes.UUIDV4,
      },
      bike: {
        allowNull: false,
        type: DataTypes.UUIDV4,
      },
      pickUpLang: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      pickUpLong: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      dropLang: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      dropLong: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
    },
    {
      tableName: 'rentals',
      sequelize,
    },
  );

  return RentalModel;
}
