import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";
import { mapOpenApi } from "../openapi";

export async function httpTrigger2(
  request: HttpRequest,
  context: InvocationContext,
): Promise<HttpResponseInit> {
  context.log(`Http function processed request for url "${request.url}"`);
  const param1 = request.query.get("param1");
  const param2 = request.query.get("param2");
  const param3 = request.query.get("param3");
  const msg = `param 1: ${param1}, param 2: ${param2}, param 3: ${param3}`;
  return { body: msg };
}

app.http("httpTrigger2", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: httpTrigger2,
});


export default mapOpenApi("/httpTrigger2", {
  get: {
    parameters: [
      {
        name: "param1",
        in: "query",
        required: true,
        schema: {
          type: "string",
        },
      },
      {
        name: "param2",
        in: "query",
        required: true,
        schema: {
          type: "number",
        },
      },
      {
        name: "param3",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
      },
    ],
    responses: {
      "200": {
        description: "Gets a message from the Function",
        content: {
          "application/json": {
            example:
              "Hello World. This is a HTTP triggered function executed successfully.",
          },
        },
      },
    },
  },
});