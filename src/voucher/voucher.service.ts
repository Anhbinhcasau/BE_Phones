import { Injectable, Controller, Inject } from '@nestjs/common';
import { VoucherRepository } from './voucher.repository';
import { VoucherDto } from './dto/d';
import { Voucher } from './schemas/voucher.schema';

@Injectable()
export class VoucherService {
  constructor(private voucherRepository: VoucherRepository) {}

  async newVoucher(voucher: Voucher) {
    return await this.voucherRepository.newVoucher(voucher);
  }

  async useVoucher({ userId, codeVoucher }) {
    return await this.voucherRepository.useVoucher(userId, codeVoucher);
  }

  async voucherList() {
    return await this.voucherRepository.voucherList();
  }

  async removeVoucherById(voucherId) {
    return await this.voucherRepository.removeVoucherById(voucherId);
  }

  async findVoucherByVoucherName(voucherName) {
    return await this.voucherRepository.findVoucherByVoucherName(voucherName);
  }
}
