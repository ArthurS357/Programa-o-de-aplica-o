import { Router } from "express";

// Importação de controladores
import { CreateCategoryController } from "./controller/category/CreateCategoryController"; import { ListCategoryController } from "./controller/category/ListCategoryController"; import { UpdateCategoryController } from "./controller/category/UpdateCategoryController"; import { DeleteCategoryController } from "./controller/category/DeleteCategoryController";

import { CreateClientController } from "./controller/client/CreateClientController"; import { ListClientController } from "./controller/client/ListClientController"; import { UpdateClientController } from "./controller/client/UpdateClientController"; import { DeleteClientController } from "./controller/client/DeleteClientController";

import { CreateProductController } from "./controller/product/CreateProductController"; import { ListProductController } from "./controller/product/ListProductController"; import { UpdateProductController } from "./controller/product/UpdateProductController"; import { DeleteProductController } from "./controller/product/DeleteProductController";

import { CreateSaleController } from "./controller/sale/CreateSaleController"; import { ListSaleController } from "./controller/sale/ListSaleController"; import { UpdateSaleController } from "./controller/sale/UpdateSaleController"; import { DeleteSaleController } from "./controller/sale/DeleteSaleController";

import { CreateUserController } from "./controller/user/CreateUserController"; import { ListUsersController } from "./controller/user/ListUserController"; import { UpdateUserController } from "./controller/user/UpdateUserController"; import { DeleteUserController } from "./controller/user/DeleteUserController";

import { CreateProfileController } from "./controller/profile/CreateProfileController"; import { ListProfileController } from "./controller/profile/ListProfileController"; import { UpdateProfileController } from "./controller/profile/UpdateProfileController"; import { DeleteProfileController } from "./controller/profile/DeleteProfileController";

import { CreateSupplyController } from "./controller/supply/CreateSupplyController"; import { ListSupplyController } from "./controller/supply/ListSupplyController"; import { UpdateSupplyController } from "./controller/supply/UpdateSupplyController"; import { DeleteSupplyController } from "./controller/supply/DeleteSupplyController";

import { AuthenticateUserController } from "./controller/autentication/AuthenticateUserController";
import { ensureAuthenticated } from "./middleware/ensureAuthenticated";

const router = Router();

// Instanciando controladores
const controllers = {
    category: {
        create: new CreateCategoryController(),
        list: new ListCategoryController(),
        update: new UpdateCategoryController(),
        delete: new DeleteCategoryController(),
    },
    client: {
        create: new CreateClientController(),
        list: new ListClientController(),
        update: new UpdateClientController(),
        delete: new DeleteClientController(),
    },
    product: {
        create: new CreateProductController(),
        list: new ListProductController(),
        update: new UpdateProductController(),
        delete: new DeleteProductController(),
    },
    sale: {
        create: new CreateSaleController(),
        list: new ListSaleController(),
        update: new UpdateSaleController(),
        delete: new DeleteSaleController(),
    },
    user: {
        create: new CreateUserController(),
        list: new ListUsersController(),
        update: new UpdateUserController(),
        delete: new DeleteUserController(),
    },
    profile: {
        create: new CreateProfileController(),
        list: new ListProfileController(),
        update: new UpdateProfileController(),
        delete: new DeleteProfileController(),
    },
    supply: {
        create: new CreateSupplyController(),
        list: new ListSupplyController(),
        update: new UpdateSupplyController(),
        delete: new DeleteSupplyController(),
    },
    auth: {
        authenticate: new AuthenticateUserController(),
    },
};

// Rotas de autenticação
router.post("/login", controllers.auth.authenticate.handle);
router.post("/users", controllers.user.create.handle);

// Middleware de autenticação 
//router.use(ensureAuthenticated);

// Rotas de Categoria
router.post("/category", controllers.category.create.handle);
router.get("/category", controllers.category.list.handle);
router.get("/category/:id", controllers.category.list.findById);
router.put("/category/:id", controllers.category.update.handle);
router.delete("/category/:id", controllers.category.delete.handle);

// Rotas de Cliente
router.post("/client", controllers.client.create.handle);
router.get("/client", controllers.client.list.handle);
router.get("/client/:id", controllers.client.list.findById);
router.put("/client/:id", controllers.client.update.handle);
router.delete("/client/:id", controllers.client.delete.handle);

// Rotas de Produto
router.post("/product", controllers.product.create.handle);
router.get("/product", controllers.product.list.handle);
router.get("/product/:id", controllers.product.list.findById);
router.put("/product/:id", controllers.product.update.handle);
router.delete("/product/:id", controllers.product.delete.handle);

// Rotas de Venda
router.post("/sale", controllers.sale.create.handle);
router.get("/sale", controllers.sale.list.handle);
router.get("/sale/:id", controllers.sale.list.findById);
router.put("/sale/:id", controllers.sale.update.handle);
router.delete("/sale/:id", controllers.sale.delete.handle);

// Rotas de Usuário
router.get("/users", controllers.user.list.handle);
router.get("/users/:id", controllers.user.list.findById);
router.put("/users/:id", controllers.user.update.handle);
router.delete("/users/:id", controllers.user.delete.handle);

// Rotas de Fornecimento (Supply)
router.post("/supply", controllers.supply.create.handle);
router.get("/supply", controllers.supply.list.handle);
router.get("/supply/:id", controllers.supply.list.findById);
router.put("/supply/:id", controllers.supply.update.handle);
router.delete("/supply/:id", controllers.supply.delete.handle);

// Rotas de Perfil
router.post("/profile", controllers.profile.create.handle);
router.get("/profile", controllers.profile.list.handle);
router.get("/profile/:id", controllers.profile.list.findById);
router.put("/profile/:id", controllers.profile.update.handle);
router.delete("/profile/:id", controllers.profile.delete.handle);

export {router}
