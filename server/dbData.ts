import { readFileSync } from "fs";

type databaseInfo = {
  dbhost: string;
  dbPort: number;
  hostPort: number;
  host: string;
  password: string;
  user: string;
  database: string;
  website?: string;
  sitePort?: number;
  cookie?: string;
};
const dbData: databaseInfo = JSON.parse(
  readFileSync("./dbData.json").toString()
);

export default {
  website: dbData.website || "localhost",
  cookie: dbData.cookie || "localhost",
  password: process.env.dbpass || dbData.password,
  host: dbData.host,
  dbhost: dbData.dbhost,
  user: dbData.user,
  database: dbData.database,
  sitePort: dbData.sitePort || 3000,
  hostPort: dbData.hostPort,
  dbPort: dbData.dbPort,
};
