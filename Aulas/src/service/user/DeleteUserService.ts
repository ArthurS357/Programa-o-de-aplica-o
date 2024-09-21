import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../../repositories/usersRepositories";

class DeleteUserService {
  async execute(id:any) {
    if (!id) {
      throw new Error("Id Incorrect");
    }
    const usersRepository = getCustomRepository(UsersRepositories)
    const userAlreadyExists = await usersRepository.findOne({
      id,
    });
 
    if (!userAlreadyExists){
      throw new Error("User not exists");
  
    }
 
    const ret = await usersRepository.delete(id);

    var messagmsgDelete = {
      message:"Registro excluido com sucesso"
    }
    return messagmsgDelete;
  }
}
export { DeleteUserService };

