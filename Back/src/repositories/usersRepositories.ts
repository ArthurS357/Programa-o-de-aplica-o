import { EntityRepository, Repository } from "typeorm";
import { User } from "../entities/user";

@EntityRepository(User)
class UsersRepositories extends Repository<User> {
  //Adicionar métodos personalizados para manipulação de usuários, se necessário.

  /**
   * @param email - O email do usuário a ser encontrado.
   * @returns O usuário encontrado ou undefined se não existir.
   */
  async findByEmail(email: string): Promise<User | undefined> {
    return this.findOne({ where: { email } });
  }
}

export { UsersRepositories };
