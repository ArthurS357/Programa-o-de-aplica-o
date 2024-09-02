class ListProductService {
    async execute() {
        const products = [ 
            {          
                id:1,
                name: "arroz",
                description:"branco",
                price: "92831892",
                categoryId: 19              
          }   
        ];
      return products
    }
  }
  export { ListProductService };
  