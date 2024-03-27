import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Brand } from './schemas/brand.schema';
import { Model } from 'mongoose';
import { BrandBuilder } from './brand.builder';

@Injectable()
export class BrandService {
  constructor(@InjectModel(Brand.name) private brandModel: Model<Brand>) {}

    async create({ name }) {
        const brandBuilder = new BrandBuilder(this.brandModel)
            .setName(name);
        return await (await brandBuilder).build();
    }

  async findAll() {
    return await this.brandModel.find().exec();
  }

  async findById(id: string) {
    return await this.brandModel.findById(id).exec();
  }

  async update(id: string, { name }) {
    const brandBuilder = new BrandBuilder(this.brandModel)
      .setId(id)
      .setName(name);
    return await (await brandBuilder).update();
  }

  async delete(id: string) {
    return await this.brandModel.findByIdAndRemove(id).exec();
  }
}
