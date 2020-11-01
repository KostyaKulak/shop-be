import {uuid} from "uuidv4";

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

    constructor(title: string, price: number, description: string, brand: string) {
        this.description = description;
        this.id = uuid();
        this.price = price;
        this.title = title;
        this.brand = brand;
    }
}
