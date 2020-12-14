import { Controller, Get, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";
import axios, { AxiosRequestConfig, Method } from "axios";

const cache = {};

@Controller()
export class BffController {
  @Get("/*")
  redirect(@Req() req: Request, @Res() res: Response): void {
    const { originalUrl, method, body } = req;

    console.log("originalUrl: ", originalUrl);
    console.log("method: ", method);
    console.log("body: ", body);

    const recipient = originalUrl.split("/")[1];
    console.log("recipient: ", recipient);

    const recipientUrl = process.env[recipient];
    console.log("recipientURL: ", recipientUrl);

    if (recipientUrl) {
      const axiosConfig:AxiosRequestConfig = {
        method: method as Method,
        url: `${recipientUrl}${originalUrl}`,
        ...(Object.keys(req.body || {}).length > 0 && { data: body })
      };

      console.log("axiosConfig: ", axiosConfig);

      if (recipient === "products") {
        if (cache[recipient] && cache[recipient].timeForDeleting > Date.now()) {
          console.log(`cache work`);
          res.json(cache[recipient].data);
          return;
        }
        console.log(`cache not work`);
      }


      axios(axiosConfig)
        .then(response => {
          console.log("response from recipient: ", response.data);

          if (recipient === "products") {
            cache[recipient] = {
              data: response.data,
              timeForDeleting: Date.now() + 120000
            };
          }
          res.json(response.data);
        })
        .catch(error => {
          console.log("Error: ", JSON.stringify(error));

          if (error.response) {
            const { status, data } = error.response;

            res.status(status).json(data);
          } else {
            res.status(500).json({ error: error.message });
          }
        });
    } else {
      res.status(502).json({ error: "Cannot process the request" });
    }
  }
}
