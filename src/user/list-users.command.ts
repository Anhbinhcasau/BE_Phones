import { User } from 'src/user/schemas/user.schema';
import { Model } from 'mongoose';
import { Command } from './ICommand';

export class ListUsersCommand implements Command {
  constructor(private readonly userModel: Model<User>) {}

  async execute() {
    return await this.userModel.find().exec();
  }
}
