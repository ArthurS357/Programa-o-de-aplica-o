import { ICategoryInterface } from "./ICategoryInterface";

interface IProductInterface {
    id?: string; // ID do produto, opcional
    name: string; // Nome do produto, obrigatório
    description?: string; // Descrição do produto, opcional
    price: number; // Preço do produto, obrigatório (considerando como número)
    category: ICategoryInterface; // Categoria do produto, obrigatória
}

export { IProductInterface };
