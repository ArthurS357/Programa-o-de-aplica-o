import { ISaleInterface } from "../../interface/ISaleInterface";
import { SalesRepositories } from "../../repositories/salesRepositories";
import { getCustomRepository } from "typeorm";

class UpdateSaleService {
  async execute({ id, userId, productId, clientID, quantity }: ISaleInterface) {
    // Validação do ID
    if (!id) {
      throw new Error("ID é obrigatório.");
    }

    const saleRepository = getCustomRepository(SalesRepositories);

    // Verifica se a venda existe
    const sale = await saleRepository.findOne({ id });
    if (!sale) {
      throw new Error("Venda não encontrada.");
    }

    // Atualiza os campos da venda
    sale.userId = userId;
    sale.productId = productId;
    sale.clientID = clientID;
    sale.quantity = quantity;

    // Salva as alterações
    await saleRepository.save(sale);

    return sale; // Retorna a venda atualizada
  }
}

export { UpdateSaleService };