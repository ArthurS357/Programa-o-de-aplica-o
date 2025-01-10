import { ProfileRepositories } from "../../repositories/profileRepositories";
import { getCustomRepository } from "typeorm";

class DeleteProfileService {
    async execute(id: string) {
        if (!id) {
            throw new Error("ID é obrigatório.");
        }

        const profileRepository = getCustomRepository(ProfileRepositories);
        const profileAlreadyExists = await profileRepository.findOne({ id });
        if (!profileAlreadyExists) {
            throw new Error("Profile não encontrada.");
        }
        await profileRepository.delete(id);
        return { message: "Registro excluído com sucesso." };
    }
}

export { DeleteProfileService };
