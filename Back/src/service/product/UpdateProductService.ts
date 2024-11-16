import { IProductInterface } from "../../interface/IProductInterface";
import { ProductsRepositories } from "../../repositories/productsRepositories";
import { CategorysRepositories } from "../../repositories/categorysRepositories";
import { getCustomRepository } from "typeorm";

class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NotFoundError";
  }
}

class UpdateProductService {
  async execute({ id, name, description, price, category }: IProductInterface) {
    if (!id) {
      throw new Error("ID é obrigatório.");
    }

    const productRepository = getCustomRepository(ProductsRepositories);
    const categoryRepository = getCustomRepository(CategorysRepositories);

    const product = await productRepository.findOne({ id });
    if (!product) {
      throw new NotFoundError("Produto não encontrado.");
    }

    const categoryEntity = await categoryRepository.findOne({ id: category.id });
    if (!categoryEntity) {
      throw new NotFoundError("Categoria não encontrada.");
    }

    // Atualizando os campos do produto
    product.name = name;
    product.description = description;
    product.price = price;
    product.category = categoryEntity;

    await productRepository.save(product); // Usar save para atualizar o produto

    return { message: "Produto atualizado com sucesso.", product };
  }
}

export { UpdateProductService, NotFoundError };
