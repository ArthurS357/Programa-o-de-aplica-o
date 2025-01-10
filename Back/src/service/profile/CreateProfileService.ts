import { IProfileRequest } from "../../interface/IProfileRequest";
import { ProfileRepositories } from "../../repositories/profileRepositories";
import { getCustomRepository } from "typeorm";
class CreateProfileService {
  async execute({ name }: IProfileRequest) {
    if (!name) {
      throw new Error("Nome Obrigatorio");
    }
    const profileRepositories = getCustomRepository(ProfileRepositories);
    const profile = profileRepositories.create(
      {
        name,
      });
      await profileRepositories.save(profile);  
      return profile;
  }
}
export { CreateProfileService };
