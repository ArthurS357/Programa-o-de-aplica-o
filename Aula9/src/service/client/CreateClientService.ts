import { IClientInterface } from "../../interface/IClientInterface";
	class CreateClientService {
  		async execute({ id, name, description, cpf, address, fone }: IClientInterface) {
    	return { message: "Registro incluido com Sucesso" }
  }
}
export { CreateClientService };
