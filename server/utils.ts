import { FastifyReply, FastifyRequest } from "fastify";
import { RouteGenericInterface } from "fastify/types/route";
import { Server, IncomingMessage, ServerResponse } from "http";
import { OkPacket } from "mysql2";

export type FResponse = FastifyReply<
  Server,
  IncomingMessage,
  ServerResponse,
  RouteGenericInterface,
  unknown
>;

export type FRequest<T> = FastifyRequest<{ Params: T; Body: string }>;

export const allowCredentials = (res: FResponse) => {
  res.header("Access-Control-Allow-Credentials", "true");
};

export const sendStatusMessage = (
  res: FResponse,
  status: number,
  msg: string
) => {
  res.status(status).send(msg);
};

export class StatusError extends Error {
  status: number;
  constructor(s: number, m: string) {
    super(m);
    this.status = s;
  }
}

export const isStatusError = (err: Error): err is StatusError =>
  !!(err as StatusError).status;

export type okSql<T> = (T & OkPacket)[];
