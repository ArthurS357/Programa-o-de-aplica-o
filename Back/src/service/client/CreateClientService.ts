import { IClientInterface } from "../../interface/IClientInterface";
import { ClientsRepositories } from "../../repositories/clientsRepositories";
import { getCustomRepository } from "typeorm";
import { Client } from "../../entities/client"; 

class CreateClientService {
    async execute(clientData: IClientInterface): Promise<Client> {
        this.validateClientData(clientData);

        const clientsRepository = getCustomRepository(ClientsRepositories);
        const client = clientsRepository.create(clientData);

        try {
            await clientsRepository.save(client);
        } catch (error) {
            console.error("Erro ao salvar o cliente:", error);
            throw new Error("Ocorreu um erro ao criar o cliente. Tente novamente mais tarde.");
        }

        return client; 
    }

    private validateClientData({ name, description, cpf, address, fone }: IClientInterface): void {
        if (!name || !description || !cpf || !address || !fone) {
            throw new Error("Todos os campos são obrigatórios.");
        }

        // Validações adicionais conforme necessário, por exemplo:
        // - Verificar formato do CPF
        // - Validar número de telefone
        // - Verificar se o nome tem um comprimento mínimo
    }
}

export { CreateClientService };
