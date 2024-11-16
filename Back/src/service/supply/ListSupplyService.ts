import { SupplysRepositories } from "../../repositories/supplyRepositories";
import { Supply } from "../../entities/supply";
import { getCustomRepository } from "typeorm";

class ListSupplyService {
    async execute(): Promise<Supply[]> {
        const supplysRepository = getCustomRepository(SupplysRepositories);
        try {
            const supplies = await supplysRepository
                .createQueryBuilder("supply") 
                .leftJoinAndSelect("supply.user", "user") 
                .getMany();
            return supplies;
        } catch (error) {
            console.error("Erro ao listar fornecedores:", error);
            throw new Error("Ocorreu um erro ao listar fornecedores.");
        }
    }

    async findById(id: string): Promise<Supply | undefined> {
        const supplysRepository = getCustomRepository(SupplysRepositories);
        try {
            const supply = await supplysRepository.findOne({ where: { id } }); // Adicionada cláusula where
            return supply;
        } catch (error) {
            console.error("Erro ao encontrar o fornecedor:", error); // Corrigido "a fornecedores" para "o fornecedor"
            throw new Error("Ocorreu um erro ao encontrar o fornecedor.");
        }
    }
}

export { ListSupplyService };
