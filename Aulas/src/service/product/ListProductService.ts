import { ProductsRepositories } from "../../repositories/productsRepositories";
import { getCustomRepository } from "typeorm";

class ListProductService {
  async execute() {
    const productsRepositories = getCustomRepository(ProductsRepositories);
    const products = await productsRepositories
      .createQueryBuilder("product")
      .getMany();
    return products;
  }
}
export { ListProductService };