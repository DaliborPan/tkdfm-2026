import { pendingPaymentMapper } from "./mapper";
import { pendingPaymentRepository } from "./repository";

export const pendingPaymentService = {
  async findAll() {
    const rows = await pendingPaymentRepository.findAll();
    return rows.map(pendingPaymentMapper.toPendingPaymentDetail);
  },
};
