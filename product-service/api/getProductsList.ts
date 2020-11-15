import {APIGatewayProxyHandler} from 'aws-lambda';
import 'source-map-support/register';
import {Product} from "../resources/product/product.model";
import {executeQuery} from "../db/db.client";
import {return500} from "../utils/error.utils";
import {CORS_HEADERS} from "../constants/headers";
import {logRequest} from "../utils/log.utils";

export const getProductsList: APIGatewayProxyHandler = async (event) => {
    logRequest(event);
    let products: Product[] = [];
    try {
        products = await executeQuery('SELECT id, title, description, price, brand, count FROM products p  JOIN stocks s on p.id = s.product_id')
        return {
            headers: CORS_HEADERS,
            statusCode: 200,
            body: JSON.stringify(products)
        };
    } catch (error) {
        return500(error);
    }
}
