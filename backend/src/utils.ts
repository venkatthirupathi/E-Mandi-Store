import { Color, blue, red } from "colorette";
import { Types, isValidObjectId } from "mongoose";
import { mixed } from "yup";

export async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export class Logger {
  constructor(private tag: string) {}

  /** Use for debug logging only */
  static log(tag: string, ...messages: any[]) {
    Logger.print(tag, messages, blue);
  }

  /** Use for debug logging only */
  log(...messages: any[]) {
    Logger.log(this.tag, ...messages);
  }

  static info(tag: string, ...messages: any[]) {
    Logger.print(tag, messages, blue);
  }

  info(...messages: any[]) {
    Logger.info(this.tag, ...messages);
  }

  static error(tag: string, ...messages: any[]) {
    Logger.print(tag, messages, red);
  }

  error(...messages: any[]) {
    Logger.error(this.tag, ...messages);
  }

  private static isObject(obj: any) {
    return typeof obj === "object" && obj !== null;
  }

  private static isUndefinedOrNull(obj: any) {
    return obj === undefined || obj === null;
  }

  private static isError(obj: any) {
    return obj instanceof Error;
  }

  // TODO: fix omitting 1st character in jest output
  private static print(tag: string, messages: any[], color: Color) {
    // print tag first
    process.stdout.write(color("[" + tag + "] "));
    // then print messages
    for (const message of messages) {
      if (Logger.isError(message)) {
        console.error(message);
      } else if (Logger.isUndefinedOrNull(message)) {
        process.stdout.write(message + "");
      } else if (Logger.isObject(message)) {
        process.stdout.write(JSON.stringify(message, null, 2));
      } else {
        process.stdout.write(message);
      }
      process.stdout.write(" ");
    }
    process.stdout.write("\n");
  }
}

export const objectIdSchema = mixed<Types.ObjectId>().test(
  (val) => val !== undefined && isValidObjectId(val)
);

export type WithId<T> = T & { _id: Types.ObjectId };

export enum HttpStatusCode {
  Continue = 100,
  SwitchingProtocols = 101,
  Processing = 102,
  EarlyHints = 103,
  Ok = 200,
  Created = 201,
  Accepted = 202,
  NonAuthoritativeInformation = 203,
  NoContent = 204,
  ResetContent = 205,
  PartialContent = 206,
  MultiStatus = 207,
  AlreadyReported = 208,
  ImUsed = 226,
  MultipleChoices = 300,
  MovedPermanently = 301,
  Found = 302,
  SeeOther = 303,
  NotModified = 304,
  UseProxy = 305,
  Unused = 306,
  TemporaryRedirect = 307,
  PermanentRedirect = 308,
  BadRequest = 400,
  Unauthorized = 401,
  PaymentRequired = 402,
  Forbidden = 403,
  NotFound = 404,
  MethodNotAllowed = 405,
  NotAcceptable = 406,
  ProxyAuthenticationRequired = 407,
  RequestTimeout = 408,
  Conflict = 409,
  Gone = 410,
  LengthRequired = 411,
  PreconditionFailed = 412,
  PayloadTooLarge = 413,
  UriTooLong = 414,
  UnsupportedMediaType = 415,
  RangeNotSatisfiable = 416,
  ExpectationFailed = 417,
  ImATeapot = 418,
  MisdirectedRequest = 421,
  UnprocessableEntity = 422,
  Locked = 423,
  FailedDependency = 424,
  TooEarly = 425,
  UpgradeRequired = 426,
  PreconditionRequired = 428,
  TooManyRequests = 429,
  RequestHeaderFieldsTooLarge = 431,
  UnavailableForLegalReasons = 451,
  InternalServerError = 500,
  NotImplemented = 501,
  BadGateway = 502,
  ServiceUnavailable = 503,
  GatewayTimeout = 504,
  HttpVersionNotSupported = 505,
  VariantAlsoNegotiates = 506,
  InsufficientStorage = 507,
  LoopDetected = 508,
  NotExtended = 510,
  NetworkAuthenticationRequired = 511,
}
