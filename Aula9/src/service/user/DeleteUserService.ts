class DeleteUserService {
  async execute(id:any) {
    if (!id) {
      throw new Error("Email incorrect");
    }
    
    return { message: "Registro Excluído com Sucesso" }
  }
}
export { DeleteUserService };
