import { Request, Response } from "express";
import { DeleteProfileService } from "../../service/profile/DeleteProfileService";

class DeleteProfileController {
    async handle(request: Request, response: Response) {
        const id = request.params.id;
        if (!id) {
            return response.status(400).json({ error: "ID da profile é obrigatório." });
        }
        const deleteProfileService = new DeleteProfileService();
        try {
            const ret = await deleteProfileService.execute(id);
            return response.status(200).json({ message: "Ola", data: ret });
        } catch (error) {
            console.error("Erro ao deletar a profile:", error);
            return response.status(500).json({ error: "Ocorreu um erro ao deletar a profile." });
        }
    }
}

export { DeleteProfileController };
