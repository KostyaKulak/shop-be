import {APIGatewayProxyHandler} from 'aws-lambda';
import 'source-map-support/register';
import {Product} from "../resources/product/product.model";
import {executeQuery} from "../db/db.client";
import {return500} from "../utils/error.utils";
import {CORS_HEADERS} from "../constants/headers";
import {logRequest} from "../utils/log.utils";

export const postProducts: APIGatewayProxyHandler = async (event, _context) => {
    logRequest(event);
    let products: Product[];
    try {
        const elements: any[] = JSON.parse(event.body);
        elements.forEach(element => {
            const {title, description, price, brand, count} = element;
            if (title === undefined || description === undefined || price === undefined || brand === undefined || count === undefined) {
                throw new Error(`${element} is not valid`);
            }
        });
        products = elements;
    } catch (e) {
        return {
            headers: CORS_HEADERS,
            statusCode: 400,
            body: `Data is not valid \n ${e.message}`
        };
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
        return {
            headers: CORS_HEADERS,
            statusCode: 201,
            body: `${products.length} products are added`
        };
    } catch (error) {
        return500(error);
    }
}