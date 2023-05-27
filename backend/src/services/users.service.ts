import { hash } from 'bcrypt';
import { Service } from 'typedi';
import { DB } from '@database';
// import { CreateUserDto } from '@dtos/users.dto';
import { HttpException } from '@/exceptions/httpException';
import { User } from '@interfaces/users.interface';

@Service()
export class UserService {
  public async findAllUser(): Promise<User[]> {
    const allUser: User[] = await DB.Users.findAll({
      logging: console.log,
    });
    return allUser;
  }

  public async findUserById(userId: number): Promise<User> {
    const findUser: User = UserModel.find(user => user.id === userId);
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    return findUser;
  }

  public async createUser(userData: User): Promise<User> {
    const findUser: User = UserModel.find(user => user.email === userData.email);
    if (findUser) throw new HttpException(409, `This email ${userData.email} already exists`);

    const hashedPassword = await hash(userData.password, 10);
    const createUserData: User = { ...userData, id: UserModel.length + 1, password: hashedPassword };

    return createUserData;
  }

  public async updateUser(userId: number, userData: User): Promise<User[]> {
    const findUser: User = UserModel.find(user => user.id === userId);
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    const hashedPassword = await hash(userData.password, 10);
    const updateUserData: User[] = UserModel.map((user: User) => {
      if (user.id === findUser.id) user = { ...userData, id: userId, password: hashedPassword };
      return user;
    });

    return updateUserData;
  }

  public async deleteUser(userId: number): Promise<User[]> {
    const findUser: User = UserModel.find(user => user.id === userId);
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    const deleteUserData: User[] = UserModel.filter(user => user.id !== findUser.id);
    return deleteUserData;
  }
}
