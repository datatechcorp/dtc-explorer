export interface FieldError {
  domain: string;
  reason: string;
  message: string;
}

export interface BaseResponse<T> {
  code: number;
  data: T;
  total_page?: number;
  page?: number;
  count?: number;
  errors?: FieldError[];
  debugErrors?: any;
  message: string;
}
