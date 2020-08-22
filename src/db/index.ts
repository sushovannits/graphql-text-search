import { Pool } from "pg";

const pool = new Pool({
  user: "postgres",
  port: 54320,
  database: "reckon_test"
});

export const query = (text: string, ...optParams: (number | string)[]) => {
  const params = optParams.length > 0 ? optParams : undefined;

  console.log(`Executed query: ${text}, params: ${params}`);
  return pool.query(text, params);
};
