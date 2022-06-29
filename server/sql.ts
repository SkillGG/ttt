import * as mysql from "mysql2";
import { dbUser, dbUser_sql } from "./dbTypes";
import { Queries } from "./queries";
import { FResponse, sendStatusMessage, okSql, StatusError } from "./utils";

let sqlPool: mysql.Pool;

const getPool = () => {
  if (!sqlPool) throw "Pool not created!";
  return sqlPool;
};

export const startPool = ({
  password,
  user,
  dbhost,
  dbPort,
  database,
}: {
  password: string;
  user: string;
  dbhost: string;
  dbPort: number;
  database: string;
}) => {
  if (!!sqlPool) return sqlPool;
  console.log("Starting mysql pool", {
    user,
    password,
    database,
    dbhost,
    dbPort,
  });
  sqlPool = mysql.createPool({
    host: dbhost,
    database,
    user,
    password,
  });
};

const query = async <T>(
  q: string,
  d: (string | number)[]
): Promise<okSql<T>> => {
  const pool = getPool();
  const poolPromise = pool.promise();
  return await poolPromise.execute<okSql<T>>(q, d)[0];
};

export const checkIfUserExists = async (
  id: string | number
): Promise<number> => {
  if (typeof id === "number") {
    const rows = query(Queries.getPlayerByID, [id]);
    if (Array.isArray(rows)) {
      if (rows.length > 0) {
        return parseInt(rows[0].id, 10);
      }
      throw new StatusError(500, "Player doesn't exist");
    }
    throw new StatusError(500, "Database didn't return properly!");
  } else {
    const rows = query(Queries.getPlayerByUsername, [id]);
    if (Array.isArray(rows)) {
      if (rows.length > 0) {
        return parseInt(rows[0].id, 10);
      }
      throw new StatusError(500, "Player doesn't exist");
    }
    throw new StatusError(500, "Database didn't return properly!");
  }
};

export const getUserFromDB = async (id: string | number): Promise<dbUser> => {
  if (typeof id === "number") {
    const rows = await query<dbUser_sql>(Queries.getPlayerByID, [id]);
    if (Array.isArray(rows)) {
      if (rows.length > 0) {
        const res = rows[0];
        return { id, username: res.username, password: res.password };
      }
      throw new StatusError(500, "Player doesn't exist");
    }
    throw new StatusError(500, "Database didn't return properly!");
  } else {
    const rows = await query<dbUser_sql>(Queries.getPlayerByUsername, [id]);
    if (Array.isArray(rows)) {
      if (rows.length > 0) {
        const res = rows[0];
        return {
          id: parseInt(rows[0].id, 10),
          username: res.username,
          password: res.password,
        };
      }
      throw new StatusError(500, "Player doesn't exist");
    }
    throw new StatusError(500, "Database didn't return properly!");
  }
};

process.on("SIGINT", () => {
  // on close
  console.log("Ending mysql pool");
  getPool().end();
  process.exit(0);
});
