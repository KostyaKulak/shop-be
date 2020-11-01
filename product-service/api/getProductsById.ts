import {APIGatewayProxyHandler} from 'aws-lambda';
import 'source-map-support/register';
import {products} from "../resources/product/product.mocked";
import {Product} from "../resources/product/product.model";

export const getProductsById: APIGatewayProxyHandler = async (event, _context) => {
    const id: string = event.pathParameters.id;
    console.log(`Product id: ${id}`);
    const productById: Product[] = products.filter((product: Product) => product.id === id);
    console.log(`Found product: ${productById}`)
    return {
        statusCode: 200,
        body: JSON.stringify(productById)
    };
}
