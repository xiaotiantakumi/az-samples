import "reflect-metadata";
import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { DataSource } from "typeorm";
import { User } from "../Entity/User";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  console.log(req);
  const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.SQL_HOST,
    port: 3306,
    username: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    database: "quickstartdb",
    synchronize: true,
    logging: false,
    entities: [User],
    migrations: [],
    subscribers: [],
  });
  AppDataSource.initialize()
    .then(async () => {
      const user = new User();
      user.firstName = "Timber";
      user.lastName = "Saw";
      user.age = Math.floor(Math.random() * 101);
      await user.save();
    })
    .catch((error) => console.log(error));
};

export default httpTrigger;
