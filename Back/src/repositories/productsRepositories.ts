import { EntityRepository, Repository } from "typeorm";
import { Product } from "../entities/product";

@EntityRepository(Product)
class ProductsRepositories extends Repository<Product> {
  //Adicionar métodos personalizados, se necessário

  async findByName(name: string): Promise<Product[]> {
    return this.createQueryBuilder("product")
      .where("product.name LIKE :name", { name: `%${name}%` })
      .getMany();
  }
}

export { ProductsRepositories };
