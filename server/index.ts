import { default as fastify } from "fastify";
import { serverSetup } from "./server";
import { default as dbData } from "./dbData";
import {
  allowCredentials,
  FRequest,
  isStatusError,
  sendStatusMessage,
  StatusError,
} from "./utils";
import { checkIfUserExists, getUserFromDB, startPool } from "./sql";

let server = fastify({
  logger: {
    transport: {
      target: "pino-pretty",
      options: {
        translateTime: "HH:MM:ss Z",
        ignore: "pid,hostname",
      },
    },
  },
});

startPool(dbData);

serverSetup(server, dbData.website);

//#region endpoints

//#region /
server.get("/", { logLevel: "error" }, (req: FRequest<{}>, res) => {
  res.status(403).send();
});
//#endregion /

//#region auth

server.get(
  "/user/id/:id",
  { logLevel: "warn" },
  async (req: FRequest<{ id: string }>, res) => {
    // get user
    allowCredentials(res);
    const isUser = await checkIfUserExists(parseInt(req.params.id, 10)).catch(
      (r: Error) => {
        if (isStatusError(r)) res.status(r.status).send(r.message);
        else throw r;
      }
    );
    return isUser;
  }
);

server.get(
  "/user/name/:username",
  { logLevel: "warn" },
  async (req: FRequest<{ username: string }>, res) => {
    const x = new Error();
    // get user
    allowCredentials(res);
    const isUser = await checkIfUserExists(req.params.username).catch(
      (r: Error) => {
        if (isStatusError(r)) res.status(r.status).send(r.message);
        else throw r;
      }
    );
    return isUser;
  }
);

server.post(
  "/login/:username",
  async (req: FRequest<{ username: string }>, res) => {
    const { username } = req.params;
    if (req.body.length < 0) throw sendStatusMessage(res, 403, "No password!");
    const user = await getUserFromDB(username).catch((r: Error) => {
      if (isStatusError(r)) res.status(r.status).send(r.message);
      else throw r;
    });
    if (user) {
      res.send(`(${user.id}):${user.username} ${user.password}==${req.body}`);
    }
  }
);

//#endregion

//#endregion endpoints

console.log(dbData);

const run = async () => {
  try {
    await server.listen({ port: dbData.hostPort, host: "::" });
  } catch (e) {
    server.log.error(e);
    process.exit(1);
  }
};

run();
