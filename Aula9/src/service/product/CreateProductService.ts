import { IProductInterface } from "../../interface/IProductInterface";
	class CreateProductService {
  		async execute({ id, name, description, price, categoryId }: IProductInterface) {
    	return { message: "Registro incluido com Sucesso" }
  }
}
export { CreateProductService };
