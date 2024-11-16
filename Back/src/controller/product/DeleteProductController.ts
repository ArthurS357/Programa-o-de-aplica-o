import { Request, Response } from "express";
import { DeleteProductService } from "../../service/product/DeleteProductService";

class DeleteProductController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    // Verificação se o ID é fornecido
    if (!id) {
      return response.status(400).json({ error: "ID é obrigatório." });
    }

    try {
      const deleteProductService = new DeleteProductService();
      await deleteProductService.execute(id);

      return response.status(200).json({ message: "Produto excluído com sucesso." });
    } catch (error) {
      // Verifica se o erro é de não encontrado
      if (error.message === "Produto não encontrado.") {
        return response.status(404).json({ error: "Produto não encontrado." });
      }

      console.error("Erro ao excluir o produto:", error);
      return response.status(500).json({ error: "Erro interno do servidor." });
    }
  }
}

export { DeleteProductController };
