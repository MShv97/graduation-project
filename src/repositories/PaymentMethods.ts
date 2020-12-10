import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import { PaymentMethod } from "../entities/PaymentMethod";

@EntityRepository(PaymentMethod)
class PaymentMethodRepository extends Repository<PaymentMethod> {}
export default getCustomRepository(PaymentMethodRepository);
