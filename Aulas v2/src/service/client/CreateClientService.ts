import { IClientInterface } from "../../interface/IClientInterface";
import { ClientsRepositories } from "../../repositories/clientsRepositories";
import { getCustomRepository } from "typeorm";

class CreateClientService {
    async execute({ name, description, cpf, address, fone }: IClientInterface) {
        // Validação de entrada
        if (!name || !description || !cpf || !address || !fone) {
            throw new Error("Todos os campos são obrigatórios.");
        }

        const clientsRepository = getCustomRepository(ClientsRepositories);

        // Cria um novo cliente
        const client = clientsRepository.create({
            name,
            description,
            cpf,
            address,
            fone,
        });

        // Salva o cliente no repositório
        try {
            await clientsRepository.save(client);
        } catch (error) {
            console.error("Erro ao salvar o cliente:", error);
            throw new Error("Ocorreu um erro ao criar o cliente.");
        }

        return client; // Retorna o cliente criado
    }
}

export { CreateClientService };
