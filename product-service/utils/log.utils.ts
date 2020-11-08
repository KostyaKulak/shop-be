import {APIGatewayProxyEventBase} from "aws-lambda";

export function logRequest<T>(event: APIGatewayProxyEventBase<T>) {
    console.log(`Path: ${event.path}`);
    console.log(`Path params: ${event.pathParameters}`);
    console.log(`Body: ${event.body}`);
}
