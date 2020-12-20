import { Injectable } from '@nestjs/common';
import axios, { AxiosResponse, Method } from 'axios';
import { GatewayCacheService } from './gateway-cache.service';

@Injectable()
export class GatewayService {
  constructor(
    private readonly _cacheService: GatewayCacheService<AxiosResponse>,
  ) {}
  route(
    url: string,
    method: string,
    body: unknown,
  ): Promise<AxiosResponse> | null {
    try {

      const recipient = url.split("/")[1];
      console.log("recipient: ", recipient);

      const recipientUrl = process.env[recipient];

      return this.getData(`${recipientUrl}${url}`, method, body);
    } catch {
      throw new Error('Cannot process request');
    }
  }

  private async getData(
    requestedUrl: string,
    method: string,
    body: unknown,
  ): Promise<AxiosResponse> {
    if (method !== 'GET' || !requestedUrl.includes('products')) {
      return GatewayService.makeRequest(requestedUrl, method, body);
    }
    const cacheInputs = { url: requestedUrl, method, body };
    const cached = this._cacheService.get(cacheInputs);
    if (cached != null) {
      console.log('RETURN RES FROM CACHE: ', requestedUrl);
      return Promise.resolve(cached);
    }
    const res = await GatewayService.makeRequest(requestedUrl, method, body);
    this._cacheService.store(cacheInputs, res);

    return res;
  }

  private static makeRequest(
    requestedUrl: string,
    method: string,
    body: unknown,
  ): Promise<AxiosResponse> {
    return axios({
      url: requestedUrl,
      method: method as Method,
      ...GatewayService.getBody(body),
    });
  }
  private static getBody(body: unknown): object {
    return Object.keys(body || {}).length > 0 ? { data: body } : {};
  }
}
