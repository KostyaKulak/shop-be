import {APIGatewayProxyHandler} from 'aws-lambda';
import 'source-map-support/register';
import {products} from "../resources/product/product.mocked";

export const getProductsById: APIGatewayProxyHandler = async (event, _context) => {
    const id: string = event.pathParameters.id;
    return {
        statusCode: 200,
        body: JSON.stringify({product: products.filter(product => product.id === id)})
    };
}
