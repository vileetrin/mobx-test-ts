import CartsStore from "../../carts/store/CartsStore.ts";

export class ProductVM {
    private _cartsStore: CartsStore

    constructor(cartsStore: CartsStore) {
        this._cartsStore = cartsStore
    }

    getAvailability(productId: number) {
        return this._cartsStore.getProductAvailability(productId)
    }

    addToCart(productId: number, cartType: "cart1" | "cart2" | "cart3") {
        this._cartsStore.addToCart(productId, cartType)
    }

}

