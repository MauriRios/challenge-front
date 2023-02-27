import { SaleDTO } from "./saleDTO.model";

export class Customer {

    id: number;
    name: string;
    lastName: string;
    dni: number;
    phone: number;
    address: string;
    status: boolean;
    purchases: SaleDTO[];

}