import {Request, Response} from "express";
import { CreateUserService } from "../../service/user/CreateUserService";
import { hash } from "bcryptjs";
class CreateUserController {
    async handle(request:Request, response: Response) {
        const {name, email, admin, password} = request.body;
        console.log(name)
        console.log(email)
        console.log(admin)
        console.log(password)
        const user=
        {
            name:name,
            email:email,
            admin:admin,
            password:password
        };
        const createuserService = new CreateUserService()
        const ret = await createuserService.execute(user)
        return response.json(ret);
    }
}
export {CreateUserController};