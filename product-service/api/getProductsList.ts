import {APIGatewayProxyHandler} from 'aws-lambda';
import 'source-map-support/register';
import {products} from "../resources/product/product.mocked";

export const getProductsList: APIGatewayProxyHandler = async () => {
    return {
        statusCode: 200,
        body: JSON.stringify({products: products})
    };
}
