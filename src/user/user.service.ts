import { FindByUsernameCommand } from './find-by-username.command';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { User } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Error, Model, Types } from 'mongoose';
import { FindByUserIdCommand } from './find-by-userid.command';
import { ChangeProfileUserCommand } from './change-profile-user.command';
import { ListUsersCommand } from './list-users.command';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async executeCommand(command: any) {
    return await command.execute();
  }

  async findByUsername(
    userName,
    select = { userName: 1, password: 1, roles: 1 },
  ) {
    const command = new FindByUsernameCommand(this.userModel, userName, select);
    return await this.executeCommand(command);
  }

  async findByUserId(userId) {
    const command = new FindByUserIdCommand(this.userModel, userId);
    return await this.executeCommand(command);
  }

  async changeProfileUser(user) {
    const command = new ChangeProfileUserCommand(this.userModel, user);
    return await this.executeCommand(command);
  }

  async listUsers() {
    const command = new ListUsersCommand(this.userModel);
    return await this.executeCommand(command);
  }
}
