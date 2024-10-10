export interface IProduct {
    id: number;
    name: string;
    price: number;
    image: string;
}

export interface ICartItem extends IProduct {
    amount: number;
}