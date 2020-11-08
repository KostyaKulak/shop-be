import {APIGatewayProxyHandler} from 'aws-lambda';
import 'source-map-support/register';
import {Product} from "../resources/product/product.model";
import {executeQuery} from "../db/db.client";

export const getProductsList: APIGatewayProxyHandler = async () => {
    let products: Product[] = [];
    try {
        products = await executeQuery('SELECT id, title, description, price, brand, count FROM products p  JOIN stocks s on p.id = s.product_id')
        return {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            },
            statusCode: 200,
            body: JSON.stringify(products)
        };
    } catch (error) {
        console.log(error);
    }
}
