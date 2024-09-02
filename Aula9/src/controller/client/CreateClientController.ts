import {Request, Response} from "express";
import { CreateClientService } from "../../service/client/CreateClientService";
class CreateClientController {
    async handle(request:Request, response: Response) {
        const {id, name, description, cpf, address, fone} = request.body;
        console.log(id)
        console.log(name)
        console.log(description)
        console.log(address)
        console.log(fone)
        const client=
        {
            id:id,
            name:name,
            description:description,
            cpf:cpf,
            address:address,
            fone:fone
        };
        const createclientService = new CreateClientService()
        const ret = await createclientService.execute(client)
        return response.json(ret);
    }
}
export {CreateClientController};