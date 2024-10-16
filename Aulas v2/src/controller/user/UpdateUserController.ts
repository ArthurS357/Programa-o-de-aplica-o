import { Request, Response } from "express";
import { UpdateUserService } from "../../service/user/UpdateUserService";
class UpdateUserController {
    async handle(request:Request, response: Response) {
        const {name, email, admin, password} = request.body;
        const id = request.params.id;
        const user=
        {
            id:id,
            name:name,
            email:email,
            admin:admin,
            password:password
        };
        const updateUserService = new UpdateUserService()
        const ret = await updateUserService.execute(user)
        return response.json(ret);
    }
}
export { UpdateUserController };
