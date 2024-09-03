import { ICategoryInterface } from "../../interface/ICategoryInterface";
	class CreateCategoryService {
  		async execute({ id, name, description }: ICategoryInterface) {
    	return { message: "Registro incluido com Sucesso" }
  }
}
export { CreateCategoryService };
