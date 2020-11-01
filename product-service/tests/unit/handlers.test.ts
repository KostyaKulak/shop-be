import {getProductsList} from "../../api/getProductsList";
import {products} from "../../resources/product/product.mocked";
import {expect} from "chai";
import {Product} from "../../resources/product/product.model";
import {getProductsById} from "../../api/getProductsById";
import {APIGatewayProxyEvent} from "aws-lambda";

describe('get products', () => {
    it('get all', () => {
        const result = getProductsList(null, null, null);
        if (result instanceof Promise) {
            result
                .then(response => JSON.parse(response.body))
                .then((parsedProducts: Product[]) => expect(parsedProducts).eql(products));
        }
    });
    it('get by id', () => {
        products.forEach(product => {
            const event: APIGatewayProxyEvent = {
                body: undefined,
                headers: {},
                httpMethod: "",
                isBase64Encoded: false,
                multiValueHeaders: {},
                multiValueQueryStringParameters: undefined,
                path: "",
                queryStringParameters: undefined,
                requestContext: undefined,
                resource: "",
                stageVariables: undefined,
                pathParameters: {
                    id: product.id
                }
            };
            const result = getProductsById(event, null, null);
            if (result instanceof Promise) {
                result
                    .then(response => JSON.parse(response.body)[0])
                    .then((parsedProduct: Product) => expect(parsedProduct).eql(product));
            }
        });
    });
});
