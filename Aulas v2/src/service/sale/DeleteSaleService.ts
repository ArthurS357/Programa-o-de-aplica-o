import { SalesRepositories } from "../../repositories/salesRepositories";
import { getCustomRepository } from "typeorm";

class DeleteSaleService {
    async execute(id: string) {
        // Validação do ID
        if (!id) {
            throw new Error("ID é obrigatório.");
        }

        const salesRepository = getCustomRepository(SalesRepositories);

        // Verifica se a venda existe
        const saleAlreadyExists = await salesRepository.findOne({ id });
        if (!saleAlreadyExists) {
            throw new Error("Venda não encontrada.");
        }

        // Deleta a venda
        await salesRepository.delete(id);

        // Mensagem de sucesso
        return { message: "Registro excluído com sucesso." };
    }
}

export { DeleteSaleService };
