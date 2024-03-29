import { User } from 'src/user/schemas/user.schema';
import { Model } from 'mongoose';
import { Command } from './ICommand';

export class FindByUserIdCommand implements Command {
  constructor(
    private readonly userModel: Model<User>,
    private readonly userId: string,
  ) {}

  async execute() {
    return await this.userModel.findById(this.userId);
  }
}
