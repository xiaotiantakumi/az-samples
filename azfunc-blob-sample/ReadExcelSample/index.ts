import {
  AzureFunction,
  Context,
  HttpRequest,
  HttpResponseSimple,
} from "@azure/functions";
import { BlobServiceClient } from "@azure/storage-blob";
import * as xlsx from "xlsx";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  let book = xlsx.readFile("assets/table-data-with-hyperlinks.xlsx");
  //console.log(book.SheetNames)
  let sheet = xlsx.utils.sheet_to_json(book.Sheets["PlainTable"], {
    header: "A",
    raw: false,
    blankrows: true,
    defval: null,
  });
  context.res = {
    body: "hellow",
  };
};

export default httpTrigger;
