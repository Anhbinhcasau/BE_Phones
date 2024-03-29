import { Module } from '@nestjs/common';
import { BrandService } from './brand.service';
import { BrandController } from './brand.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Brand, BrandSChema } from './schemas/brand.schema';
import { BrandFacade } from './facade/brand.facade';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Brand.name, schema: BrandSChema }]),
  ],
  providers: [BrandFacade, BrandService],
  controllers: [BrandController],
})
export class BrandModule {}
