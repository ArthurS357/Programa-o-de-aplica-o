import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../../repositories/usersRepositories";


class ListUserService {
    async execute() {
        const usersRepositories = getCustomRepository(UsersRepositories);
        const users = await usersRepositories
        .createQueryBuilder("user")
        .getMany();
        return users;
    }
    }
  export { ListUserService };
  