import { ProductsRepositories } from "../../repositories/productsRepositories";
import { getCustomRepository } from "typeorm";
import { Product } from "../../entities/product"; 

class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NotFoundError";
  }
}

class ListProductService {
  async execute(): Promise<Product[]> {
    const productsRepository = getCustomRepository(ProductsRepositories);
    try {
      const products = await productsRepository
        .createQueryBuilder("product")
        .leftJoinAndSelect("product.category", "category")
        .getMany();
      return products;
    } catch (error) {
      throw new Error("Ocorreu um erro ao listar os produtos: " + error.message);
    }
  }

  async findById(id: string): Promise<Product | undefined> {
    if (!id) {
      throw new Error("ID é obrigatório.");
    }

    const productsRepository = getCustomRepository(ProductsRepositories);
    try {
      const product = await productsRepository.findOne({ id });
      if (!product) {
        throw new NotFoundError("Produto não encontrado.");
      }
      return product;
    } catch (error) {
      throw new Error("Ocorreu um erro ao encontrar o produto: " + error.message);
    }
  }
}

export { ListProductService, NotFoundError };
