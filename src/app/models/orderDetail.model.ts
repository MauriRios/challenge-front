import { ProductSaleDTO } from "./productSaleDTO.model";
import { Sale } from "./sale.model";

export class OrderDetail {

    private id: number;
    private sale: Sale;
    private product: ProductSaleDTO[];
    private quantity: number;
}

