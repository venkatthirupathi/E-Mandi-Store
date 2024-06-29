export interface UserFromResponse {
  _id: string;
}

export interface MessageResponse {
  message: string;
}

export type Overwrite<
  T,
  U extends Partial<{
    [k in keyof T]: unknown;
  }>,
> = Pick<T, Exclude<keyof T, keyof U>> & U;

export type OmitStrict<T, K extends keyof T> = T extends any
  ? Pick<T, Exclude<keyof T, K>>
  : never;
