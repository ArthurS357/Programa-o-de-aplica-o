import { ClientsRepositories } from "../../repositories/clientsRepositories";
import { getCustomRepository } from "typeorm";
import { Client } from "../../entities/client"; 

class ListClientService {
  private clientsRepository = getCustomRepository(ClientsRepositories);

  async execute(): Promise<Client[]> {
    try {
      const clients = await this.clientsRepository
        .createQueryBuilder("client")
        .getMany();
      return clients;
    } catch (error) {
      console.error("Erro ao listar clientes:", error);
      throw new Error("Ocorreu um erro ao listar os clientes. Tente novamente mais tarde.");
    }
  }

  async findById(id: string): Promise<Client | undefined> {
    this.validateId(id);

    try {
      const client = await this.clientsRepository.findOne({ id });
      if (!client) {
        throw new Error("Cliente não encontrado.");
      }
      return client;
    } catch (error) {
      console.error("Erro ao encontrar o cliente:", error);
      throw new Error("Ocorreu um erro ao encontrar o cliente. Tente novamente mais tarde.");
    }
  }

  private validateId(id: string): void {
    if (!id) {
      throw new Error("ID é obrigatório.");
    }

    // Adicione validações adicionais conforme necessário, por exemplo:
    // - Verificar se o ID tem um formato válido
  }
}

export { ListClientService };
