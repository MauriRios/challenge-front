import { ProductSaleDTO } from "./productSaleDTO.model";

export interface SaleDTO {

    id: number;
    providerId: number;
    customerId: number;
    date: Date;
    quantity: number;
    totalPrice: number;
    products: ProductSaleDTO[];

}