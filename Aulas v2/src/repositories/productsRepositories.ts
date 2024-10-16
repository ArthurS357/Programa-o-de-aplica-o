import { EntityRepository, Repository } from "typeorm";
import { Product } from "../entities/product";

@EntityRepository(Product)
class ProductsRepositories extends Repository<Product> {
  static createQueryBuilder(arg0: string) {
    throw new Error("Method not implemented.");
  }
}

export { ProductsRepositories };
