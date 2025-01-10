import { ProductsRepositories } from "../../repositories/productsRepositories";
import { getCustomRepository } from "typeorm";

class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NotFoundError";
  }
}

class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

class DeleteProductService {
  async execute(id: string): Promise<{ message: string }> {
    if (!id) {
      throw new ValidationError("ID é obrigatório.");
    }

    const productsRepository = getCustomRepository(ProductsRepositories);
    const product = await productsRepository.findOne({ id });

    if (!product) {
      throw new NotFoundError("Produto não encontrado.");
    }

    try {
      await productsRepository.delete(id);
    } catch (error) {
      throw new Error("Ocorreu um erro ao excluir o produto: " + error.message);
    }

    return { message: "Produto excluído com sucesso." };
  }
}

export { DeleteProductService, NotFoundError, ValidationError };
