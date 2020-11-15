import {CORS_HEADERS} from "../constants/headers";

export function return500(error: Error) {
    return {
        headers: CORS_HEADERS,
        statusCode: 500,
        body: error.message
    };
}
