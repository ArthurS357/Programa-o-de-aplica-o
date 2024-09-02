import { ISaleInterface } from "../../interface/ISaleInterface";
	class CreateSaleService {
  		async execute({ id, userId, productId, clientID, quantity }: ISaleInterface) {
    	return { message: "Registro incluido com Sucesso" }
  }
}
export { CreateSaleService };
