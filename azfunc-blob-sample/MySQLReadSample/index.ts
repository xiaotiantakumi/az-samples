import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import * as mysql from "mysql";
import * as fs from "fs";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  console.log("start functions");
  const config = {
    host: process.env.SQL_HOST || "",
    user: process.env.SQL_USER || "",
    password: process.env.SQL_PASSWORD || "",
    database: "quickstartdb",
    port: 3306,
    ssl: {
      rejectUnauthorized: true,
      ca: process.env.SQL_CRT || "",
    },
  };

  console.log(config.host);
  console.log(config.user);
  console.log(config.password);
  console.log(config.ssl.ca);
  const conn = mysql.createConnection(config);

  conn.connect(function (err) {
    if (err) {
      console.log("!!! Cannot connect !!! Error:");
      throw err;
    } else {
      console.log("Connection established.");
      queryDatabase();
    }
  });

  function queryDatabase() {
    conn.query(
      "DROP TABLE IF EXISTS inventory;",
      function (err, results, fields) {
        if (err) throw err;
        console.log("Dropped inventory table if existed.");
      }
    );
    conn.query(
      "CREATE TABLE inventory (id serial PRIMARY KEY, name VARCHAR(50), quantity INTEGER);",
      function (err, results, fields) {
        if (err) throw err;
        console.log("Created inventory table.");
      }
    );
    conn.query(
      "INSERT INTO inventory (name, quantity) VALUES (?, ?);",
      ["banana6", 150],
      function (err, results, fields) {
        if (err) throw err;
        else console.log("Inserted " + results.affectedRows + " row(s).");
      }
    );
    conn.query(
      "INSERT INTO inventory (name, quantity) VALUES (?, ?);",
      ["orange", 154],
      function (err, results, fields) {
        if (err) throw err;
        console.log("Inserted " + results.affectedRows + " row(s).");
      }
    );
    conn.query(
      "INSERT INTO inventory (name, quantity) VALUES (?, ?);",
      ["apple", Math.floor(Math.random() * 101)],
      function (err, results, fields) {
        if (err) throw err;
        console.log("Inserted " + results.affectedRows + " row(s).");
      }
    );
    conn.end(function (err) {
      if (err) throw err;
      else console.log("Done.");
    });
  }
};

export default httpTrigger;
