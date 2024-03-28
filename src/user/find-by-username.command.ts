import { User } from 'src/user/schemas/user.schema';
import { Model } from 'mongoose';
import { Command } from './ICommand';

export class FindByUsernameCommand implements Command {
  constructor(
    private readonly userModel: Model<User>,
    private readonly userName: string,
    private readonly select: Record<string, any>,
  ) {}

  async execute() {
    return await this.userModel
      .findOne({ userName: this.userName })
      .select(this.select);
  }
}
