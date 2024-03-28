import { Voucher } from './schemas/voucher.schema';

export interface IVoucherRepository {
  newVoucher(voucher: Voucher): Promise<Voucher>;
  useVoucher(userId: string, codeVoucher: string): Promise<Voucher>;
  voucherList(): Promise<Voucher[]>;
  removeVoucherById(voucherId: string): Promise<void>;
  editVoucher(voucher: Voucher): Promise<Voucher>;
  findVoucherByVoucherName(voucherName: string): Promise<Voucher>;
}
