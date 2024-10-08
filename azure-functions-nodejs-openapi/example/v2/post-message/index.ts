import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { mapOpenApi2 } from "@aaronpowell/azure-functions-nodejs-openapi";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  context.log("HTTP trigger function processed a request.");
  const name = req.body && req.body.name;
  const responseMessage = name
    ? "Hello, " + name + ". This HTTP triggered function executed successfully."
    : "This HTTP triggered function executed successfully. Pass a name in the request body for a personalized response.";

  context.res = {
    // status: 200, /* Defaults to 200 */
    body: responseMessage,
  };
};

export default mapOpenApi2(httpTrigger, "/message", {
  post: {
    produces: ["application/json"],
    consumes: ["application/json"],
    parameters: [
      {
        name: "body",
        in: "body",
        type: "object",
        schema: {
          $ref: "#/definitions/Message",
        },
      },
    ],
    responses: {
      "200": {
        description: "Gets a message from the Function",
      },
    },
  },
});
