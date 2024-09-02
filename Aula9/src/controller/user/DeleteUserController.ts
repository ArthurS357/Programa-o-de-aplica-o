import {Request, Response} from "express";
import { DeleteUserService } from "../../service/user/DeleteUserService";
class DeleteUserController {
  async handle(request: Request, response: Response) {

    const id= request.params.id;
    const createuserService= new DeleteUserService()
    const ret= await createuserService.execute(id)
    return response.json(ret);
  }
}
export { DeleteUserController };