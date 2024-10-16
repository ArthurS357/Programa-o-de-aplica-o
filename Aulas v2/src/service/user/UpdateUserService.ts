import { hash } from "bcryptjs";
import { getCustomRepository } from "typeorm";
import { IUserRequest } from "../../interface/IUserRequest";
import { UsersRepositories } from "../../repositories/usersRepositories";

  class UpdateUserService {
    async execute({id, name, email, admin = false, password }: IUserRequest) {
        if (!email) {
          throw new Error("Email incorrect");
        }
        if (!password) {
          throw new Error("Password incorrect");
        }
        const passwordHash = await hash(password,8)
        const usersRepository = getCustomRepository(UsersRepositories)
        
        const userAlreadyExists = await usersRepository.findOne({
          id,
        });
        if (!userAlreadyExists){
          throw new Error("User not exists")
        }
        userAlreadyExists.name=name
        userAlreadyExists.email=email
        userAlreadyExists.admin=admin
        userAlreadyExists.password=passwordHash

        const user = await usersRepository.update(id,userAlreadyExists)
        return user
      }
  }
  export { UpdateUserService };

   