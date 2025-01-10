import { IClientInterface } from "../../interface/IClientInterface";
import { ClientsRepositories } from "../../repositories/clientsRepositories";
import { getCustomRepository } from "typeorm";
import { Client } from "../../entities/client"; 

class UpdateClientService {
    async execute({ id, name, description, cpf, address, fone }: IClientInterface): Promise<Client> {
        this.validateId(id);

        const clientRepository = getCustomRepository(ClientsRepositories);
        const client = await clientRepository.findOne({ id });

        if (!client) {
            throw new Error("Cliente não encontrado.");
        }

        // Atualiza apenas os campos que foram fornecidos
        client.name = name ?? client.name;
        client.description = description ?? client.description;
        client.cpf = cpf ?? client.cpf;
        client.address = address ?? client.address;
        client.fone = fone ?? client.fone;

        try {
            await clientRepository.save(client);
        } catch (error) {
            console.error("Erro ao atualizar o cliente:", error);
            throw new Error("Ocorreu um erro ao atualizar o cliente. Tente novamente mais tarde.");
        }

        return client; 
    }

    private validateId(id: string): void {
        if (!id) {
            throw new Error("ID é obrigatório.");
        }

        // Adicione validações adicionais conforme necessário, por exemplo:
        // - Verificar se o ID tem um formato válido
    }
}

export { UpdateClientService };
