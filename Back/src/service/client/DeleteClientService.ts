import { ClientsRepositories } from "../../repositories/clientsRepositories";
import { getCustomRepository } from "typeorm";

class DeleteClientService {
  async execute(id: string): Promise<{ message: string }> {
    this.validateId(id);

    const clientsRepository = getCustomRepository(ClientsRepositories);
    const clientExists = await clientsRepository.findOne({ id });

    if (!clientExists) {
      throw new Error("Cliente não encontrado.");
    }

    try {
      await clientsRepository.delete(id);
    } catch (error) {
      console.error("Erro ao excluir o cliente:", error);
      throw new Error("Ocorreu um erro ao excluir o cliente. Tente novamente mais tarde.");
    }

    return { message: "Cliente excluído com sucesso." };
  }

  private validateId(id: string): void {
    if (!id) {
      throw new Error("ID é obrigatório.");
    }

    // Adicione validações adicionais conforme necessário, por exemplo:
    // - Verificar se o ID tem um formato válido
  }
}

export { DeleteClientService };
