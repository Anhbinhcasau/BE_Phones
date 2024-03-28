import { Injectable, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Voucher } from './schemas/voucher.schema';

export class VoucherRepository {
  constructor(
    @InjectModel(Voucher.name) private readonly voucherModel: Model<Voucher>,
  ) {}

  async newVoucher(voucher: Voucher): Promise<Voucher> {
    const foundCodeVoucher = await this.voucherModel.findOne({
      codeVoucher: voucher.codeVoucher,
    });
    if (foundCodeVoucher)
      throw new HttpException('Không được đặt trùng code voucher', 402);
    const newVoucher = await this.voucherModel.create(voucher);
    return newVoucher;
  }

  async useVoucher(userId: string, codeVoucher: string): Promise<Voucher> {
    const foundVoucher: any = await this.voucherModel
      .findOne({ codeVoucher })
      .exec();
    const foundUserUsed = foundVoucher?.userUsed.some(
      (user) => user === userId,
    );

    if (foundUserUsed)
      throw new HttpException('Bạn đã sử dụng voucher này', 406);

    const checkQuantity = +foundVoucher.quantity;
    if (checkQuantity <= 0)
      throw new HttpException('Số lượng voucher đã hết', 403);

    const filter = { codeVoucher },
      update = { $push: { userUsed: userId }, $inc: { quantity: -1 } },
      options = { upsert: true };
    return await this.voucherModel
      .findOneAndUpdate(filter, update, options)
      .exec();
  }

  async voucherList(): Promise<Voucher[]> {
    return await this.voucherModel.find().exec();
  }

  async removeVoucherById(voucherId: string): Promise<void> {
    const foundVoucher = await this.voucherModel.findOne({
      _id: new Types.ObjectId(voucherId),
    });
    if (!foundVoucher)
      throw new HttpException('Không tìm thấy id voucher', 403);

    await this.voucherModel.deleteOne({
      _id: new Types.ObjectId(voucherId),
    });
  }

  async editVoucher(voucher: Voucher): Promise<Voucher> {
    // Implement logic to edit voucher
    const foundVoucher = await this.voucherModel.findOne({
      _id: new Types.ObjectId(voucher.codeVoucher),
    });
    if (!foundVoucher) throw new HttpException('Không tìm thấy voucher', 403);

    const filter = { _id: new Types.ObjectId(voucher.codeVoucher) },
      options = { upsert: true };
    return await this.voucherModel
      .findOneAndUpdate(filter, voucher, options)
      .exec();
  }

  async findVoucherByVoucherName(voucherName: string): Promise<Voucher> {
    // Implement logic to find voucher by name
    const foundVoucher = await this.voucherModel.findOne({
      codeVoucher: voucherName,
    });

    if (!foundVoucher)
      throw new HttpException('Không tìm thấy voucher này!', 403);

    return foundVoucher;
  }
}
