import { Module } from '@nestjs/common';
import { ResetpassController } from './resetpass.controller';
import { ResetpassService } from './resetpass.service';
import { PassWord, PassWordSchema } from './schema/password.schema';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: PassWord.name, schema: PassWordSchema }]),
  ],
  controllers: [ResetpassController],
  providers: [ResetpassService],
})
export class ResetpassModule {}
