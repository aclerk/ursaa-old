export enum RequestTypeEnum {
  query,
  save,
  update,
  delete
}

export declare interface Request {
  type: RequestTypeEnum;
  data: any;
}
