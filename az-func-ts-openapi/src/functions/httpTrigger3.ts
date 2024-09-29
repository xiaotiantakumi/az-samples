import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";
import { mapOpenApi, generateOpenApiSpec } from "../openapi";

// HTTPトリガー関数の実装例
export async function httpTrigger3(
  request: HttpRequest,
  context: InvocationContext,
): Promise<HttpResponseInit> {
  context.log(`Http function processed request for url "${request.url}"`);
  const name = request.query.get("name") || (await request.text()) || "world";
  return { body: `Hello, ${name}!` };
}

// APIのマッピングとドキュメント生成
app.http("httpTrigger3", {
  methods: ["GET", "POST"],
  authLevel: "anonymous",
  handler: httpTrigger3,
});

// 複数のメソッドと詳細な入力制限を持つOpenAPIスペックのマッピング
export default mapOpenApi("/httpTrigger3", {
  get: {
    parameters: [
      {
        name: "name",
        in: "query",
        required: true,
        schema: {
          type: "string",
          minLength: 1,
          maxLength: 100
        },
        description: "Name of the person to greet"
      },
    ],
    responses: {
      "200": {
        description: "Gets a greeting message",
        content: {
          "application/json": {
            example: "Hello, {name}!",
          },
        },
      },
    },
  },
  post: {
    requestBody: {
      description: "Request body for creating a new greeting",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: {
                type: "string",
                minLength: 5,
                maxLength: 200
              }
            },
            required: ["message"]
          },
          example: {
            message: "Hello, new world!"
          }
        }
      }
    },
    responses: {
      "201": {
        description: "Creates and returns a new greeting message",
        content: {
          "application/json": {
            example: "New greeting created!"
          }
        },
      },
    },
  }
});
