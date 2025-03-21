export interface SuccessResponse<Data> {
  message: string
  data: Data
}

export interface ErrorResponse<Data> extends Error {
  message: string
  errors?: Data
}

export interface ValidationErrorField {
  type: string
  value: string
  msg: string
  path: string
  location: string
}

export type ValidationErrors = Record<string, ValidationErrorField>;
