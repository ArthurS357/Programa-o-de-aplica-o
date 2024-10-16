import { EntityRepository, Repository } from "typeorm";
import { Sale } from "../entities/sale";

@EntityRepository(Sale)
class SalesRepositories extends Repository<Sale> {
  static createQueryBuilder(arg0: string) {
    throw new Error("Method not implemented.");
  }
}

export { SalesRepositories };
