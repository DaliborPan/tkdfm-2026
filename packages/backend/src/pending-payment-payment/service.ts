import { pendingPaymentPaymentMapper } from "./mapper";
import { pendingPaymentPaymentRepository } from "./repository";

export const pendingPaymentPaymentService = {
  async findAll() {
    const rows = await pendingPaymentPaymentRepository.findAll();
    return rows.map(pendingPaymentPaymentMapper.toPendingPaymentPaymentDetail);
  },
};
