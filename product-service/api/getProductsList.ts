import {APIGatewayProxyHandler} from 'aws-lambda';
import 'source-map-support/register';
import {products} from "../resources/product/product.mocked";
import fetch from 'node-fetch';

export const getProductsList: APIGatewayProxyHandler = async () => {
    const response = await fetch('http://worldtimeapi.org/api/ip')
    const json = await response.json();
    console.log(`Current time: ${json.datetime}`);
    return {
        statusCode: 200,
        body: JSON.stringify(products)
    };
}
