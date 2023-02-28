import { Product } from "./product.model";
import { Sale } from "./sale.model";

export class Provider {
    slice() {
      throw new Error('Method not implemented.');
    }

    id: number;
    providerName: string;
    providerLastName: string;
    cuit: number;
    phone: number;
    address: string;
    status: boolean;
    productList: Product[];
}