import { ConflictException, ForbiddenException, HttpException, Injectable } from '@nestjs/common';
import { User } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Error, Model, Types } from 'mongoose';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) { }

  async findByUsername(
    userName,
    select = {
      userName: 1,
      password: 1,
      roles: 1,
    },
  ) {
    return await this.userModel.findOne({ userName }).select(select);
  }

  async findByUserId(userId) {
    return await this.userModel.findById(userId);
  }

  async changeProfileUser({ user }) {
    const foundUser = await this.userModel.findById(user._id);
    if (!foundUser) throw new ForbiddenException('Không tìm thấy user')
    const filter = { _id: new Types.ObjectId(user._id) }, newUpdate = { ...user, _id: new Types.ObjectId(user._id) },
      option = { upsert: true, new: true }

    return await this.userModel.findByIdAndUpdate(filter, newUpdate, option)
  }

  async listUser() {
    return await this.userModel.find().exec()
  }

  async createUser(user: UserDto) {
    const foundUser = await this.userModel.findOne({ userEmail: user.email, userName: user.userName })
    if (foundUser) throw new HttpException('Người dùng đã tồn tại', 402);

    const newUser = await this.userModel.create(user)
    if (!newUser) throw new ConflictException('Lỗi khi tạo người dùng')

    return {
      message: 'Thêm mới người dùng thành công',
      status: 201,
      metadata: user,
    }
  }
}
