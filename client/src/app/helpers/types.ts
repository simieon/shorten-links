import {Observable} from "rxjs";

export interface IErrorHandler{
  handleError(error: unknown): Observable<never> | void
}

export type ErrorResponse = {
  error:{
    error: string
    message: string
    statusCode: number
  }
}
