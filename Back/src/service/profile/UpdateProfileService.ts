import { IProfileRequest } from "../../interface/IProfileRequest";
import { ProfileRepositories } from "../../repositories/profileRepositories";
import { getCustomRepository } from "typeorm";
import { Profile } from "../../entities/profile";

class UpdateProfileService {
  async execute({ id, name }: IProfileRequest): Promise<Profile> {
    if (!id) {
      throw new Error("ID é obrigatório.");
    }

    const profileRepository = getCustomRepository(ProfileRepositories);
    const profile = await profileRepository.findOne({ id });
    if (!profile) {
      throw new Error("Profile não encontrada.");
    }

    if (name !== undefined) profile.name = name;

    try {
      await profileRepository.save(profile);
    } catch (error) {
      console.error("Erro ao atualizar a profile:", error);
      throw new Error("Ocorreu um erro ao atualizar a profile.");
    }

    return profile; 
  }
}

export { UpdateProfileService };
