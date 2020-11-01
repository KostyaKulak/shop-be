import {APIGatewayProxyHandler} from 'aws-lambda';
import 'source-map-support/register';
import {products} from "../resources/product/product.mocked";
import fetch from 'node-fetch';

export const getProductsList: APIGatewayProxyHandler = async () => {
    try {
        const response = await fetch('http://worldtimeapi.org/api/ip')
        const json = await response.json();
        console.log(`Current time: ${json.datetime}`);
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
