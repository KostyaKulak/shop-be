interface IProduct {
    id: string,
    title: string,
    description: string,
    price: number,
    brand: string
}

let counter: number = 0;

export class Product implements IProduct {
    description: string;
    id: string;
    price: number;
    title: string;
    brand: string;

    constructor(title: string, price: number, description: string, brand: string) {
        this.description = description;
        this.id = (counter++).toString();
        this.price = price;
        this.title = title;
        this.brand = brand;
    }
}
