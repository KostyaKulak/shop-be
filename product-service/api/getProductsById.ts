import {APIGatewayProxyHandler} from 'aws-lambda';
import 'source-map-support/register';
import {Product} from "../resources/product/product.model";
import {executeQuery} from "../db/db.client";

export const getProductsById: APIGatewayProxyHandler = async (event, _context) => {
    try {
        const id: string = event.pathParameters.id;
        console.log(`Product id: ${id}`);
        const productById: Product[] = await executeQuery(`SELECT id, title, description, price, brand, count FROM products p  JOIN stocks s on p.id = s.product_id WHERE id = '${id}'`)
        console.log(`Found product: ${productById}`)
        if (productById.length !== 0) {
            return {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': true,
                },
                statusCode: 200,
                body: JSON.stringify(productById)
            };
        } else {
            return {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': true,
                },
                statusCode: 404,
                body: 'Product not found'
            };
        }
    } catch (error) {
        console.log(error)
    }
}
