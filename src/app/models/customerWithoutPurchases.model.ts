import { Customer } from "./customer.model";

export interface CustomerWithoutPurchases {
    id: number;
    name: string;
    lastName: string;
    dni: number;
    phone: number;
    address: string;
    status: boolean;
}

export function excludePurchases(customer: Customer): CustomerWithoutPurchases {
    const { purchases, ...customerWithoutPurchases } = customer;
    return customerWithoutPurchases;
}