import { Client } from "pg";
import * as faker from "faker";

const client = new Client({
  user: "postgres",
  host: "localhost",
  password: "postgres",
  port: 54320,
  database: "reckon_test"
});

const createTables = () => {
  return client.query(`
    CREATE TABLE IF NOT EXISTS text_to_search (
        text_to_search text NOT NULL,
    );
    
    CREATE TABLE IF NOT EXISTS search_results (
      result json NOT NULL
    );
  `);
};

const populateData = async () =>
  await Promise.all(
    Array.from({ length: 25 }).map(async _ => {
      await client.query(`
        INSERT INTO text_to_search(title, content)
        VALUES (
            '${faker.lorem.text()}',
        );
    `);
    })
  );

const main = async () => {
  console.log("DB Setup...");
  await client.connect();

  await createTables();
  await populateData();

  await client.end();
};

(async () => {
  try {
    await main();
  } catch (e) {
    console.error(e);
  }
})();
