import { ISaleInterface } from "../../interface/ISaleInterface";
import { SalesRepositories } from "../../repositories/salesRepositories";
import { getCustomRepository } from "typeorm";

class CreateSaleService {
    async execute({ userId, productId, clientID, quantity }: ISaleInterface) {
        // Validação de entrada
        if (!userId) {
            throw new Error("User ID é obrigatório.");
        }
        if (!productId) {
            throw new Error("Product ID é obrigatório.");
        }
        if (!clientID) {
            throw new Error("Client ID é obrigatório.");
        }

        const salesRepository = getCustomRepository(SalesRepositories);

        // Cria uma nova venda
        const sale = salesRepository.create({
            userId,
            productId,
            clientID,
            quantity,
        });

        // Salva a venda no repositório
        try {
            await salesRepository.save(sale);
        } catch (error) {
            console.error("Erro ao salvar a venda:", error);
            throw new Error("Ocorreu um erro ao criar a venda.");
        }

        return sale; // Retorna a venda criada
    }
}

export { CreateSaleService };
