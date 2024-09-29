import { HttpResponseInit, InvocationContext, HttpRequest } from "@azure/functions";
import { OpenAPIV3 } from "openapi-types";
import { z } from 'zod';

const paths = new Map<string, OpenAPIV3.PathItemObject>();

const parameterSchema = z.object({
  name: z.string(),
  in: z.string(),
  required: z.boolean(),
  description: z.string().optional(),
  schema: z.object({
    type: z.string(),
    format: z.string().optional(),
    enum: z.array(z.any()).optional(),
    minimum: z.number().optional(),
    maximum: z.number().optional()
  }),
  example: z.any().optional()
});

const responseSchema = z.object({
  description: z.string(),
  content: z.record(z.string(), z.object({
    schema: z.object({
      type: z.string(),
      properties: z.record(z.string(), z.any()).optional(),
      required: z.array(z.string()).optional()
    }).optional(),
    example: z.any()
  }))
});

const pathItemObjectSchema = z.object({
  get: z.object({
    parameters: z.array(parameterSchema),
    responses: z.record(z.string(), responseSchema)
  }).optional(),
  post: z.object({
    parameters: z.array(parameterSchema).optional(),
    responses: z.record(z.string(), responseSchema),
    requestBody: z.object({
      description: z.string().optional(),
      content: z.record(z.string(), z.object({
        schema: z.object({
          type: z.string(),
          properties: z.record(z.string(), z.any()).optional(),
          required: z.array(z.string()).optional()
        }),
        example: z.any().optional()
      }))
    }).optional()
  }).optional()
  // その他のHTTPメソッドも同様に定義可能
}).passthrough();

function addOrUpdatePath(key: string, value: OpenAPIV3.PathItemObject): void {
  paths.set(key, { ...paths.get(key), ...value });
}

function mapOpenApi(route: string, spec: OpenAPIV3.PathItemObject): void {
  // Zodスキーマを使用してspecのバリデーションを行う
  const parsedSpec = pathItemObjectSchema.safeParse(spec);
  if (!parsedSpec.success) {
    throw new Error(`Invalid spec for route ${route}: ${parsedSpec.error}`);
  }

  addOrUpdatePath(route, spec);
}

const generateOpenApiSpec = (doc: Omit<OpenAPIV3.Document, "paths" | "openapi">) => 
  async (req: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> => {
    const body: OpenAPIV3.Document = {
      ...doc,
      openapi: "3.1.0",
      paths: Object.fromEntries(paths)
    };
    return {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    };
};

export { mapOpenApi, generateOpenApiSpec };
