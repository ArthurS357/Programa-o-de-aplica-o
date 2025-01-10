import { Request, Response } from "express";
import { UpdateProfileService } from "../../service/profile/UpdateProfileService";

class UpdateProfileController {
    async handle(request: Request, response: Response) {
        const { name } = request.body;
        const id = request.params.id;
        if (!name) {
            return response.status(400).json({ error: "Todos os campos são obrigatórios." });
        }

        const profile = {
            id: id,
            name: name,
        };
        const updateProfileService = new UpdateProfileService();
        try {
            const ret = await updateProfileService.execute(profile);
            return response.status(200).json(ret);
        } catch (error) {
            console.error("Erro ao atualizar a profile:", error);
            return response.status(500).json({ error: "Ocorreu um erro ao atualizar a profile." });
        }
    }
}

export { UpdateProfileController };