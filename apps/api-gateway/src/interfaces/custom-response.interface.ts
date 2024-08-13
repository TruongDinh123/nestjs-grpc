export interface ICustomResponse<T = any> {
  message?: string;
  result?: T;
  data?: T;
}
