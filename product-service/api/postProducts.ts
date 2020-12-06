import {APIGatewayProxyHandler} from 'aws-lambda';
import 'source-map-support/register';
import {logRequest} from "../utils/log.utils";
import {validateAndCreateProducts} from "./validatateAndCreateProducts";
import {toSuccess} from "../../core/response";
import {return500} from "../utils/error.utils";

export const postProducts: APIGatewayProxyHandler = async (event, _context) => {
    logRequest(event);
    try {
        await validateAndCreateProducts(event.body);
        return toSuccess({payload: `Products are added`}, {statusCode: 201});
    } catch (error) {
        return return500(error);
    }
}
