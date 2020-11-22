import {APIGatewayProxyHandler} from 'aws-lambda';
import 'source-map-support/register';
import {logRequest} from "../utils/log.utils";
import {validateAndCreateProducts} from "./validatateAndCreateProducts";

export const postProducts: APIGatewayProxyHandler = async (event, _context) => {
    logRequest(event);
    return validateAndCreateProducts(event.body);
}
