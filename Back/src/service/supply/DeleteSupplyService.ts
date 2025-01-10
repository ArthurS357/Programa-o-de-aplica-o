import { SupplysRepositories } from "../../repositories/supplyRepositories";
import { getCustomRepository } from "typeorm";

class DeleteSupplyService {
    async execute(id: string) {
        if (!id) {
            throw new Error("ID é obrigatório.");
        }

        const supplysRepository = getCustomRepository(SupplysRepositories);
        const supplyAlreadyExists = await supplysRepository.findOne({ where: { id } });
        
        if (!supplyAlreadyExists) {
            throw new Error("Fornecedor não encontrado.");
        }

        try {
            await supplysRepository.delete(id);
        } catch (error) {
            console.error("Erro ao excluir o fornecimento:", error);
            throw new Error("Ocorreu um erro ao excluir o fornecimento.");
        }

        return { message: "Registro excluído com sucesso." };
    }
}

export { DeleteSupplyService };
