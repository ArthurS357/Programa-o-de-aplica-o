import { SalesRepositories } from "../../repositories/salesRepositories";
import { getCustomRepository } from "typeorm";

class DeleteSaleService {
    async execute(id: string) {
        // Verifica se o ID é fornecido e não é uma string vazia
        if (!id || id.trim() === "") {
            throw new Error("ID é obrigatório.");
        }

        const salesRepository = getCustomRepository(SalesRepositories);
        
        // Verifica se a venda existe
        const saleAlreadyExists = await salesRepository.findOne(id);
        
        if (!saleAlreadyExists) {
            throw new Error("Venda não encontrada.");
        }

        try {
            // Exclui a venda
            await salesRepository.delete(id);
        } catch (error) {
            console.error("Erro ao excluir a venda:", error);
            throw new Error("Ocorreu um erro ao excluir a venda.");
        }

        return { message: "Registro excluído com sucesso." };
    }
}

export { DeleteSaleService };
