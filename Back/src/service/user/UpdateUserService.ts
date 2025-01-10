import { IUserRequest } from "../../interface/IUserRequest";
import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../../repositories/usersRepositories";
import { ProfileRepositories } from "../../repositories/profileRepositories";
import { hash } from "bcryptjs";

const ERROR_MESSAGES = {
  EMAIL_REQUIRED: "Email is required",
  PASSWORD_REQUIRED: "Password is required",
  USER_NOT_FOUND: "User does not exist",
  PROFILE_NOT_FOUND: "Profile does not exist",
};

class UpdateUserService {
  async execute({ id, name, email, admin = false, password, profile }: IUserRequest) {
    this.validateInput(email, password);

    const usersRepository = getCustomRepository(UsersRepositories);
    const profileRepositories = getCustomRepository(ProfileRepositories);

    const userAlreadyExists = await usersRepository.findOne({ id });
    if (!userAlreadyExists) {
      throw new Error(ERROR_MESSAGES.USER_NOT_FOUND);
    }

    const prof = await profileRepositories.findOne({ id: profile.id });
    if (!prof) {
      throw new Error(ERROR_MESSAGES.PROFILE_NOT_FOUND);
    }

    const passwordHash = await hash(password, 8);

    // Usando merge para atualizar o usuário
    const updatedUser = usersRepository.merge(userAlreadyExists, {
      name,
      email,
      admin,
      password: passwordHash,
      profile: prof,
    });

    await usersRepository.save(updatedUser);
    return updatedUser;
  }

  private validateInput(email: string | undefined, password: string | undefined) {
    if (!email) {
      throw new Error(ERROR_MESSAGES.EMAIL_REQUIRED);
    }
    if (!password) {
      throw new Error(ERROR_MESSAGES.PASSWORD_REQUIRED);
    }
  }
}

export { UpdateUserService };
