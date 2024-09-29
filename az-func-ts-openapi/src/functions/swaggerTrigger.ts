import {
  app,
} from "@azure/functions";
import { generateOpenApiSpec } from "../openapi";


app.http("swaggerTrigger", {
  methods: ["GET", "POST"],
  authLevel: "anonymous",
  handler: generateOpenApiSpec({
    info: {
      title: "Azure Function Swagger v3.1 demo",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:7071",
      },
    ],
  }),
});

