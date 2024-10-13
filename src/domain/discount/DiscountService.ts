class DiscountService {
    calculateDiscount(totalItems: number): number {
        if (totalItems >= 3 && totalItems < 10) {
            return 0.07;
        } else if (totalItems >= 10) {
            return 0.10;
        }
        return 0;
    }
}

export default DiscountService;