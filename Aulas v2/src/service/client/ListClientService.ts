import { ClientsRepositories } from "../../repositories/clientsRepositories";
import { getCustomRepository } from "typeorm";


class ListClientService {
  async execute() {
    const clientsRepositories = getCustomRepository(ClientsRepositories);
    const clients = await clientsRepositories
      .createQueryBuilder("client")
      .getMany();
    return clients;
  }
}
export { ListClientService };