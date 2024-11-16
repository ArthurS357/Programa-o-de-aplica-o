import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../../repositories/usersRepositories";

const ERROR_MESSAGES = {
  ID_REQUIRED: "Id is required",
  USER_NOT_FOUND: "User does not exist",
  DELETE_ERROR: "An error occurred while deleting the user.",
};

class DeleteUserService {
  async execute(id: string) {
    this.validateInput(id);

    const usersRepository = getCustomRepository(UsersRepositories);
    const userAlreadyExists = await usersRepository.findOne({ id });

    if (!userAlreadyExists) {
      throw new Error(ERROR_MESSAGES.USER_NOT_FOUND);
    }

    try {
      await usersRepository.delete(id);
    } catch (error) {
      console.error("Error deleting user:", error);
      throw new Error(ERROR_MESSAGES.DELETE_ERROR);
    }

    return { message: "User successfully deleted." };
  }

  private validateInput(id: string | undefined) {
    if (!id) {
      throw new Error(ERROR_MESSAGES.ID_REQUIRED);
    }
  }
}

export { DeleteUserService };
