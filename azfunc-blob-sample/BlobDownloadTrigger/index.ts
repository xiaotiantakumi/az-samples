import {
  AzureFunction,
  Context,
  HttpRequest,
  HttpResponseSimple,
} from "@azure/functions";
import { BlobServiceClient } from "@azure/storage-blob";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  const STORAGE_CONNECTION_STRING = process.env.STORAGE_CONNECTION_STRING || "";
  const blobServiceClient = BlobServiceClient.fromConnectionString(
    STORAGE_CONNECTION_STRING
  );

  // Create a container if not exist
  const containerName = "excel-container";
  const containerClient = blobServiceClient.getContainerClient(containerName);
  const hasContainer = await containerClient.exists();
  if (!hasContainer) {
    console.log(
      "コンテナーがありません。BlobUploadTriggerを先に実行してください。"
    );
    return;
  }

  const excelName = "table-data-with-hyperlinks.xlsx";
  const blobClient = containerClient.getBlockBlobClient(excelName);
  const hasItem = await blobClient.exists();
  if (hasItem) {
    const buffer = await blobClient.downloadToBuffer();
    context.res = {
      headers: { "Content-Disposition": "attachment;filename=book.xls" },
      body: buffer,
    };
    return;
  }
};

async function streamToBuffer(readableStream) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    readableStream.on("data", (data) => {
      chunks.push(data instanceof Buffer ? data : Buffer.from(data));
    });
    readableStream.on("end", () => {
      resolve(Buffer.concat(chunks));
    });
    readableStream.on("error", reject);
  });
}

export default httpTrigger;
