import { IUserRequest } from "../../interface/IUserRequest";
import { hash } from "bcryptjs";
import { UsersRepositories } from "../../repositories/usersRepositories";
import { getCustomRepository } from "typeorm";

const ERROR_MESSAGES = {
  EMAIL_REQUIRED: "Email is required",
  PASSWORD_REQUIRED: "Password is required",
};

class CreateUserService {
  async execute({ name, email, admin = false, password, profile }: IUserRequest) {
    this.validateInput(email, password);

    const passwordHash = await hash(password, 8);
    const usersRepository = getCustomRepository(UsersRepositories);

    const user = usersRepository.create({
      name,
      email,
      admin,
      password: passwordHash,
      profile: {
        id: profile.id,
      },
    });

    await usersRepository.save(user);
    return user;
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

export { CreateUserService };
