class DeleteSaleService {
    async execute(id:any) {
      if (!id) {
        throw new Error("id incorrect");
      }
      
      return { message: "Registro Excluído com Sucesso" }
    }
  }
  export { DeleteSaleService };

  