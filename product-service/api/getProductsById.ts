import {APIGatewayProxyHandler} from 'aws-lambda';
import 'source-map-support/register';
import {Product} from "../resources/product/product.model";
import {executeQuery} from "../db/db.client";
import {return500} from "../utils/error.utils";
import {logRequest} from "../utils/log.utils";
import {toError, toSuccess} from "../../core/response";

export const getProductsById: APIGatewayProxyHandler = async (event, _context) => {
    logRequest(event);
    try {
        const id: string = event.pathParameters.id;
        console.log(`Product id: ${id}`);
        const productById: Product[] = await executeQuery(`SELECT id, title, description, price, brand, count FROM products p  JOIN stocks s on p.id = s.product_id WHERE id = '${id}'`)
        console.log(`Found product: ${productById}`)
        if (productById.length !== 0) {
            return toSuccess(productById);
        } else {
            return toError('Product not found');
        }
    } catch (error) {
        return500(error);
    }
}
