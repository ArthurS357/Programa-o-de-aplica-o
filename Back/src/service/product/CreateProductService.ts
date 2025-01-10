import { IProductInterface } from "../../interface/IProductInterface";
import { ProductsRepositories } from "../../repositories/productsRepositories";
import { getCustomRepository } from "typeorm";
import { Category } from "../../entities/category"; 

class CreateProductService {
    async execute({ name, description, price, category }: IProductInterface) {
        // Verificação de campos obrigatórios
        if (!name || !description || price === undefined || !category) {
            throw new Error("Todos os campos são obrigatórios.");
        }

        const productsRepository = getCustomRepository(ProductsRepositories);
        
        // Verificação se a categoria existe
        const categoryExists = await productsRepository.manager.findOne(Category, { where: { id: category.id } });
        if (!categoryExists) {
            throw new Error("A categoria fornecida não existe.");
        }

        // Criação do produto
        const product = productsRepository.create({
            name,
            description,
            price,
            category: categoryExists // Usando a categoria encontrada
        });

        try {
            await productsRepository.save(product);
        } catch (error) {
            console.error("Erro ao salvar o produto:", error);
            throw new Error("Ocorreu um erro ao criar o produto. Tente novamente mais tarde.");
        }

        return product; // Retorna o produto criado
    }
}

export { CreateProductService };
