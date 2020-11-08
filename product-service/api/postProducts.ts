import {APIGatewayProxyHandler} from 'aws-lambda';
import 'source-map-support/register';
import {Product} from "../resources/product/product.model";
import {executeQuery} from "../db/db.client";

export const postProducts: APIGatewayProxyHandler = async (event, _context) => {
    try {
        const products: Product[] = JSON.parse(event.body);
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
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            },
            statusCode: 201,
            body: `${products.length} products are added`
        };
    } catch (error) {
        console.log(error)
    }
}
