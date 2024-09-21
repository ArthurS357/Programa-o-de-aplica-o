import { ClientsRepositories } from "../../repositories/clientsRepositories";
import { getCustomRepository } from "typeorm";

class DeleteClientService {
  async execute(id: any) {
    if (!id) {
      throw new Error("Id Incorrect");
    }
    const clientsRepository = getCustomRepository(ClientsRepositories)
    const clientAlreadyExists = await clientsRepository.findOne({
      id,
    });

    if (!clientAlreadyExists) {
      throw new Error("Sale not exists");

    }

    const ret = await clientsRepository.delete(id);

    var messagmsgDelete = {
      message: "Registro excluido com sucesso"
    }
    return messagmsgDelete;
  }
}
export { DeleteClientService };
