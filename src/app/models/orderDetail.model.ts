import { ProductSaleDTO } from "./productSaleDTO.model";
import { SaleDTO } from "./saleDTO.model";

export class OrderDetail {

    sale: SaleDTO;
    product: ProductSaleDTO[];
}

