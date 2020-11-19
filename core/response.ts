import { headers as defaultHeaders } from './headers'

interface IOptions {
    statusCode?: number
    headers?: { [key: string]: string }
}

export const toSuccess = (payload: any, options: IOptions = {}) => {
    const { statusCode = 200, headers } = options
    return {
        body: JSON.stringify(payload),
        statusCode: statusCode,
        headers: { ...defaultHeaders, ...headers }
    }
}

export const toError = (error: any, options: IOptions = {}) => {
    const { statusCode = 404, headers } = options

    return {
        statusCode,
        body: JSON.stringify(error),
        headers: { ...defaultHeaders, ...headers }
    }
}
