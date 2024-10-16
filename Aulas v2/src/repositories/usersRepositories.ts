import { EntityRepository, Repository } from "typeorm";
import { User } from "../entities/user";

@EntityRepository(User)
class UsersRepositories extends Repository<User> {
  static createQueryBuilder(arg0: string) {
    throw new Error("Method not implemented.");
  }
}

export { UsersRepositories };
