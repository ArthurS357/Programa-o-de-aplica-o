import { IClientInterface } from "../../interface/IClientInterface";
import { ClientsRepositories } from "../../repositories/clientsRepositories";
import { getCustomRepository } from "typeorm";

class UpdateClientService {
    async execute({ id, name, description, cpf, address, fone }: IClientInterface) {
        // Validação do ID
        if (!id) {
            throw new Error("ID é obrigatório.");
        }

        const clientRepository = getCustomRepository(ClientsRepositories);

        // Verifica se o cliente existe
        const client = await clientRepository.findOne({ id });
        if (!client) {
            throw new Error("Cliente não encontrado.");
        }

        // Atualiza os campos do cliente
        client.name = name;
        client.description = description;
        client.cpf = cpf;
        client.address = address;
        client.fone = fone;

        // Salva as alterações
        try {
            await clientRepository.save(client);
        } catch (error) {
            console.error("Erro ao atualizar o cliente:", error);
            throw new Error("Ocorreu um erro ao atualizar o cliente.");
        }

        return client; // Retorna o cliente atualizado
    }
}

export { UpdateClientService };
