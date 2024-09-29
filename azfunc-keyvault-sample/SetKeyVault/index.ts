import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { SecretClient } from "@azure/keyvault-secrets";
import { DefaultAzureCredential } from "@azure/identity";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  // const secret = process.env.KEY_VAULT_SECRET;
  // context.log.error(secret);
  const credential = new DefaultAzureCredential();
  context.log.error("test");
  context.log.error(credential);
  const url = "https://keyvault-from-functions.vault.azure.net";
  const client = new SecretClient(url, credential);
  context.log.error(client);

  // シークレットを作成する場合
  const uniqueString = new Date().getTime();
  const secretName = "mysecret";
  const result = await client.setSecret(secretName, `${uniqueString}`);
  context.log.error("result: ", result);

  // シークレットを名称から取得
  const secret = await client.getSecret(secretName);
  context.log.error("secret: ", secret);

  // シークレットのバージョンを指定して更新
  // if (secret.properties.version != null) {
  //   const updatedSecret = await client.updateSecretProperties(
  //     secretName,
  //     secret.properties.version,
  //     {
  //       enabled: true,
  //     }
  //   );
  //   console.log("updated secret: ", updatedSecret);
  // }

  context.res = {
    // status: 200, /* Defaults to 200 */
    body: "Hello, World!",
  };
};
export default httpTrigger;
