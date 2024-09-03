class ListUserService {
    async execute() {
        const users = [ 
            {          
                name:"Fabio",
                email:"fabio@gmail.com",admin:false,
                password:"1234"             
          }, {          
            name:"Marcio",
            email:"marcio@gmail.com", admin:false,
            password:"1234"             
         }     
        ];
      return users
    }
  }
  export { ListUserService };
  