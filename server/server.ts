import { FastifyInstance } from "fastify";
import CookiePlugin, { FastifyCookieOptions } from "@fastify/cookie";
import CorsPlugin, { FastifyCorsOptions } from "@fastify/cors";

export const serverSetup = (server: FastifyInstance, origin: string) => {
  server.register(CookiePlugin, {
    secret: "secret",
    paseOptions: { maxAge: 90000 },
  } as FastifyCookieOptions);

  server.register(CorsPlugin, {
    origin,
    optionsSuccessStatus: 200,
  } as FastifyCorsOptions);
};
