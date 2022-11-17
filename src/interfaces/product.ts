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

export interface Sneaker {
    name: string;
    offer: boolean;
    brand: string;
    price: number;
    color: string;
    image: string;
    Description: string;
}
