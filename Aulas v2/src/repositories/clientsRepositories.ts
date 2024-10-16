import { EntityRepository, Repository } from "typeorm";
import { Client } from "../entities/client";

@EntityRepository(Client)
class ClientsRepositories extends Repository<Client> {
  static createQueryBuilder(arg0: string) {
    throw new Error("Method not implemented.");
  }
}

export { ClientsRepositories };
