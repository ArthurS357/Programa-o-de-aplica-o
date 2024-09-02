class ListClientService {
    async execute() {
        const client = [ 
            {          
                id:1,
                name: "jorge",
                description:"grande",
                cpf: "92831892",
                address: "Rua caxumba",
                fone: "891329318923"              
          }   
        ];
      return client
    }
  }
  export { ListClientService };
  