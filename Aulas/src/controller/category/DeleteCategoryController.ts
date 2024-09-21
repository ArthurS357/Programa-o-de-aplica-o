import {Request, Response} from "express";
import { DeleteCategoryService } from "../../service/category/DeleteCategoryService";
class DeleteCategoryController {
  async handle(request: Request, response: Response) {

    const id= request.params.id;
    const createcategoryService= new DeleteCategoryService()
    const ret= await createcategoryService.execute(id)
    return response.json(ret);
  }
}
export { DeleteCategoryController };