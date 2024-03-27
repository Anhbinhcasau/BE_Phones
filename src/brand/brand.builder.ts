import { InjectModel } from '@nestjs/mongoose';
import { Brand } from './schemas/brand.schema';
import { Model } from 'mongoose';
import { BadRequestException } from '@nestjs/common';

export class BrandBuilder {
  private id: string;
  private name: string;

  constructor(@InjectModel(Brand.name) private brandModel: Model<Brand>) {
    this.brandModel = brandModel;
  }

  setId(id: string) {
    this.id = id;
    return this;
  }

  async setName(name: string) {
    const brand = await this.brandModel.findOne({ name }).exec();

    if (brand) {
      throw new BadRequestException('Brand name is already exist');
    }

    this.name = name;
    return this;
  }

  async build() {
    return await this.brandModel.create({ name: this.name });
  }

  async update() {
    return await this.brandModel
      .findByIdAndUpdate(this.id, { name: this.name }, { new: true })
      .exec();
  }
}
