import { ProductSaleDTO } from "./productSaleDTO.model";

export interface createSale {

    providerId: number;
    customerId: number;
    products: ProductSaleDTO[];
    
}