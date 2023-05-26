import { Sequelize, Model, DataTypes, Optional } from 'sequelize';
import { User } from '@interfaces/users.interface';
import { DataTypeUUIDv4 } from 'sequelize';

export type UserCreationAttributes = Optional<User, 'id' | 'name' | 'email' | 'password' | 'createdAt' | 'updatedAt'>;

export class UserModel extends Model<User, UserCreationAttributes> implements User {
  public id: DataTypeUUIDv4;
  public name: string;
  public email: string;
  public password: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof UserModel {
  UserModel.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUIDV4,
        defaultValue: Sequelize.UUIDV4,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING(45),
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING(45),
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING(255),
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
      tableName: 'users',
      sequelize,
    },
  );

  // const User = sequelize.define('User', {
  //   id: DataTypes.UUIDV4,
  //   name: DataTypes.STRING,
  //   email: DataTypes.STRING,
  //   password: DataTypes.STRING,
  // });

  // User.associate = function (models) {
  //   // associations can be defined here
  // };

  return UserModel;
}
