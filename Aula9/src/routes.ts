import { Router} from "express";

//1.Controller
import { CreateCategoryController } from "./controller/category/CreateCategoryController";
import { ListCategoryController } from "./controller/category/ListCategoryController";
import { UpdateCategoryController } from "./controller/category/UpdateCategoryController";
import { DeleteCategoryController } from "./controller/category/DeleteCategoryController";

//2.client
import { CreateClientController } from "./controller/client/CreateClientController";
import { ListClientController } from "./controller/client/ListClientController";
import { UpdateClientController } from "./controller/client/UpdateClientController";
import { DeleteClientController } from "./controller/client/DeleteClientController";

//3.Product
import { CreateProductController } from "./controller/product/CreateProductController";
import { ListProductController } from "./controller/product/ListProductController";
import { UpdateProductController } from "./controller/product/UpdateProductController";
import { DeleteProductController } from "./controller/product/DeleteProductController";

//4.Sale
import { CreateSaleController } from "./controller/sale/CreateSaleController";
import { ListSaleController } from "./controller/sale/ListSaleController";
import { UpdateSaleController } from "./controller/sale/UpdateSaleController";
import { DeleteSaleController } from "./controller/sale/DeleteSaleController";

//5.User
import { CreateUserController } from "./controller/user/CreateUserController";
import { ListUserController } from "./controller/user/ListUserController";
import { UpdateUserController } from "./controller/user/UpdateUserController";
import { DeleteUserController } from "./controller/user/DeleteUserController";

//6.Authenticate
import { AuthenticateUserController } from "./controller/autentication/AuthenticateUserController";

///---------------------------------------------------------------///

const router = Router();

//1.Controller
const createCategoryController = new CreateCategoryController();
const listCategoryController = new ListCategoryController();
const updateCategoryController = new UpdateCategoryController();
const deleteCategoryController = new DeleteCategoryController();

//2.client
const createClientController = new CreateClientController();
const listClientController = new ListClientController();
const updateClientController = new UpdateClientController();
const deleteClientController = new DeleteClientController();

//3.Product
const createProductController = new CreateProductController();
const listProductController = new ListProductController();
const updateProductController = new UpdateProductController();
const deleteProductController = new DeleteProductController();

//4.Sale
const createSaleController = new CreateSaleController();
const listSaleController = new ListSaleController();
const updateSaleController = new UpdateSaleController();
const deleteSaleController = new DeleteSaleController();

//5.user
const createUserController = new CreateUserController();
const listUserController = new ListUserController();
const updateUserController = new UpdateUserController();
const deleteUserController = new DeleteUserController();

//6.Authenticate
const authenticateUserController = new AuthenticateUserController();
import { ensureAuthenticated } from "./middleware/ensureAuthenticated";


///---------------------------------------------------------------///

//Encriptar
router.post("/login", authenticateUserController.handle);
router.post("/users", createUserController.handle);
router.use(ensureAuthenticated)



//1.Controller
router.post("/category", createCategoryController.handle);
router.get("/category", listCategoryController.handle);
router.put("/categories/:id", updateCategoryController.handle);
router.delete("/categories/:id", deleteCategoryController.handle);

//2.Client
router.post("/client", createClientController.handle);
router.get("/clients", listClientController.handle);
router.put("/clients/:id", updateClientController.handle);
router.delete("/clients/:id", deleteClientController.handle);

//3.Product
router.post("/product", createProductController.handle);
router.get("/product", listProductController.handle);
router.put("/products/:id", updateProductController.handle);
router.delete("/products/:id", deleteProductController.handle);

//4.Sale
router.post("/sale", createSaleController.handle);
router.get("/sale", listSaleController.handle);
router.put("/sales/:id", updateSaleController.handle);
router.delete("/sales/:id", deleteSaleController.handle);

//5.user
router.get("/users", listUserController.handle);
router.put("/users/:id", updateUserController.handle);
router.delete("/users/:id", deleteUserController.handle);

export {router}
