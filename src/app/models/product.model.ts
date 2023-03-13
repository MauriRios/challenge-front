import { Provider } from "./provider.model";
import { Sale } from "./sale.model";

export class Product {

    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    status: boolean;
    quantity: number;
    provider: Provider;
    sales: Sale[];
}