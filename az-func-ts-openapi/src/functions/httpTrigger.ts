import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";
import { mapOpenApi,generateOpenApiSpec } from "../openapi";

export async function httpTrigger(
  request: HttpRequest,
  context: InvocationContext,
): Promise<HttpResponseInit> {
  context.log(`Http function processed request for url "${request.url}"`);

  const name = request.query.get("name") || (await request.text()) || "world";
  return { body: `Hello, ${name}!` };
}

app.http("httpTrigger", {
  methods: ["GET", "POST"],
  authLevel: "anonymous",
  handler: httpTrigger,
});


export default mapOpenApi("/httpTrigger", {
  get: {
    parameters: [
      {
        name: "name",
        in: "query",
        required: true,
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