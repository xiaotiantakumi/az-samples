import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { BlobServiceClient } from "@azure/storage-blob";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  const fBody = req.parseFormBody();
  const excel = fBody.get("excel");
  console.log(excel);

  const STORAGE_CONNECTION_STRING = process.env.STORAGE_CONNECTION_STRING || "";
  // Note - Account connection string can only be used in node.
  const blobServiceClient = BlobServiceClient.fromConnectionString(
    STORAGE_CONNECTION_STRING
  );

  // Create a container if not exist
  const containerName = "excel-container";
  const containerClient = blobServiceClient.getContainerClient(containerName);
  const hasContainer = await containerClient.exists();
  if (!hasContainer) {
    const createContainerResponse = await containerClient.create();
    console.log(
      `Create container ${containerName} successfully`,
      createContainerResponse.requestId
    );
  }
  const excelName = excel.fileName ?? "";
  const blobClient = containerClient.getBlockBlobClient(excelName);
  const hasItem = await blobClient.exists;
  if (!hasItem) {
    const uploadBlobResponse = await blobClient.upload(
      excel.value,
      Buffer.byteLength(excel.value)
    );
    console.log(
      `Upload block blob ${excelName} successfully`,
      uploadBlobResponse.requestId
    );
  }
};

export default httpTrigger;
