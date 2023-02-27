import { Product } from "./product.model";
import { Sale } from "./sale.model";

export class Provider {

    id: number;
    providerName: string;
    providerLastName: string;
    cuit: number;
    phone: number;
    address: string;
    status: boolean;
    products: Product[];
    saleList: Sale[];
}