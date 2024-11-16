import { EntityRepository, Repository } from "typeorm";
import { Client } from "../entities/client";

@EntityRepository(Client)
class ClientsRepositories extends Repository<Client> {
  // Você pode usar this.createQueryBuilder() diretamente em seus métodos.

  // Adicionar métodos personalizados aqui, se necessário
  // Exemplo: um método para encontrar clientes por CPF
  async findByCpf(cpf: string): Promise<Client | undefined> {
    return this.findOne({ where: { cpf } });
  }
}

export { ClientsRepositories };
