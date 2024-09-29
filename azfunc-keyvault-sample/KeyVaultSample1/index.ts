import { AzureFunction, Context, HttpRequest } from "@azure/functions";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  const secret = process.env.KEY_VAULT_SECRET;
  context.res = {
    status: 200, /* Defaults to 200 */
    body: secret,
  };
};

export default httpTrigger;
