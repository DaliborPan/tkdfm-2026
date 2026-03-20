import { paymentMapper } from "./mapper";
import { paymentRepository } from "./repository";

export const paymentService = {
  async findAll() {
    const rows = await paymentRepository.findAll();
    return rows.map(paymentMapper.toPaymentDetail);
  },
};
