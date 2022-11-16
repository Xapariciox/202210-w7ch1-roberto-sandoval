export interface Product {
    id: number;
    address: string;
    type: string;
    nombre: string;
    latitude: number;
    longitude: number;
}

export type Products = {
    Products: Array<Product>;
};
