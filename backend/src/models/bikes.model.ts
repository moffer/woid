import { Sequelize, Model, DataTypes, Optional } from 'sequelize';
import { Bike } from '@interfaces/bikes.interface';
import { User } from '@interfaces/users.interface';
import { DataTypeUUIDv4 } from 'sequelize';

export type BikeCreationAttributes = Optional<
  Bike,
  'id' | 'description' | 'color' | 'currentLocationLang' | 'currentLocationLong' | 'createdAt' | 'updatedAt'
>;

export class BikeModel extends Model<Bike, BikeCreationAttributes> implements Bike {
  public id: DataTypeUUIDv4;
  public description: string;
  public color: string;
  public currentLocationLang: number;
  public currentLocationLong: number;

  public owner: User;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof BikeModel {
  BikeModel.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUIDV4,
      },
      color: {
        allowNull: false,
        type: DataTypes.STRING(45),
      },
      description: {
        allowNull: false,
        type: DataTypes.STRING(45),
      },
      owner: {
        allowNull: false,
        type: DataTypes.STRING(45),
      },
      currentLocationLang: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
      currentLocationLong: {
        allowNull: true,
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
      tableName: 'bikes',
      sequelize,
    },
  );

  // const Bike = sequelize.define('Bike', {
  //   id: DataTypes.UUIDV4,
  //   name: DataTypes.STRING,
  //   email: DataTypes.STRING,
  //   password: DataTypes.STRING,
  // });

  // Bike.associate = function (models) {
  //   // associations can be defined here
  // };

  return BikeModel;
}
