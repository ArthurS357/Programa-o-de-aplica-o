import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../../repositories/usersRepositories";

const ERROR_MESSAGES = {
  USER_NOT_FOUND: "User not found",
};

class ListUserService {
  async execute() {
    const usersRepository = getCustomRepository(UsersRepositories);
    const users = await usersRepository
      .createQueryBuilder("user")
      .leftJoinAndSelect("user.profile", "profile")
      .getMany();
    return users;
  }

  async findById(id: string) {
    this.validateInput(id);

    const usersRepository = getCustomRepository(UsersRepositories);
    const user = await usersRepository.findOne({ id });

    if (!user) {
      throw new Error(ERROR_MESSAGES.USER_NOT_FOUND);
    }

    return user;
  }

  private validateInput(id: string | undefined) {
    if (!id) {
      throw new Error("Id is required");
    }
  }
}

export { ListUserService };
