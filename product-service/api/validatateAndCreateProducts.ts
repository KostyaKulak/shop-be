import {toError, toSuccess} from "../../core/response";
import {executeQuery} from "../db/db.client";
import {Product} from "../resources/product/product.model";
import {return500} from "../utils/error.utils";

export const validateAndCreateProducts = async (body) => {
    let products: Product[];
    try {
        const elements: any[] = JSON.parse(body);
        elements.forEach(element => {
            const {title, description, price, brand, count} = element;
            if (title === undefined || description === undefined || price === undefined || brand === undefined || count === undefined) {
                throw new Error(`${element} is not valid`);
            }
        });
        products = elements;
    } catch (e) {
        return toError(`Data is not valid \n ${e.message}`);
    }
    try {
        for (const product of products) {
            await executeQuery(`
                    INSERT INTO products (title, description, price, brand)
                    VALUES ('${product.title}', '${product.description}', '${product.price}', '${product.brand}')
                `)
            await executeQuery(`
                    INSERT INTO stocks (product_id, count)
                    VALUES ((SELECT id FROM products WHERE products.title = '${product.title}'), ${product.count})`)

        }

        toSuccess({payload: `${products.length} products are added`}, {statusCode: 201});
    } catch (error) {
        return500(error);
    }
}
