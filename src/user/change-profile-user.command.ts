import { ForbiddenException } from '@nestjs/common';
import { User } from 'src/user/schemas/user.schema';
import { Model, Types } from 'mongoose';
import { Command } from './ICommand';

export class ChangeProfileUserCommand implements Command {
  constructor(
    private readonly userModel: Model<User>,
    private readonly user: any,
  ) {}

  async execute() {
    const foundUser = await this.userModel.findById(this.user._id);
    if (!foundUser) throw new ForbiddenException('Không tìm thấy user');

    const filter = { _id: new Types.ObjectId(this.user._id) };
    const updatedUser = await this.userModel.findOneAndUpdate(
      filter,
      this.user,
      { upsert: true, new: true },
    );

    return updatedUser;
  }
}
