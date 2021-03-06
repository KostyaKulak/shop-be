interface IProduct {
    id: string,
    title: string,
    description: string,
    price: number,
    brand: string
}

export class Product implements IProduct {
    description: string;
    id: string;
    price: number;
    title: string;
    brand: string;
    count: number;

    constructor(id: string, title: string, price: number, description: string, brand: string, count: number) {
        this.description = description;
        this.id = id;
        this.price = price;
        this.title = title;
        this.brand = brand;
        this.count = count;
    }
}
