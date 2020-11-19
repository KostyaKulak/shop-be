import {APIGatewayProxyHandler} from 'aws-lambda';
import 'source-map-support/register';
import {Product} from "../resources/product/product.model";
import {executeQuery} from "../db/db.client";
import {return500} from "../utils/error.utils";
import {logRequest} from "../utils/log.utils";
import {toSuccess} from "../../core/response";

export const getProductsList: APIGatewayProxyHandler = async (event) => {
    logRequest(event);
    let products: Product[] = [];
    try {
        products = await executeQuery('SELECT id, title, description, price, brand, count FROM products p  JOIN stocks s on p.id = s.product_id')
        return toSuccess(products);
    } catch (error) {
        return500(error);
    }
}
