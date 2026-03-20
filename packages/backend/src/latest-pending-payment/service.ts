import { latestPendingPaymentMapper } from "./mapper";
import { latestPendingPaymentRepository } from "./repository";

export const latestPendingPaymentService = {
  async findAll() {
    const rows = await latestPendingPaymentRepository.findAll();
    return rows.map(latestPendingPaymentMapper.toLatestPendingPaymentDetail);
  },
};
