import {Request, Response} from "express";
import { DeleteProductService } from "../../service/product/DeleteProductService";
class DeleteProductController {
  async handle(request: Request, response: Response) {

    const id= request.params.id;
    const createproductService= new DeleteProductService()
    const ret= await createproductService.execute(id)
    return response.json(ret);
  }
}
export { DeleteProductController };