export type FieldError = {
  field: string;
  message: string;
};

export type ApiErrorPayload = {
  status: number;
  message: string;
  errors?: FieldError[];
  fields?: string[];
};

export class ApiError extends Error {
  status: number;
  errors?: FieldError[];
  fields?: string[];

  constructor(payload: ApiErrorPayload) {
    super(payload.message);
    this.name = "ApiError";
    this.status = payload.status;
    this.errors = payload.errors;
    this.fields = payload.fields;
  }
}

export function fieldErrorMap(error: ApiError): Record<string, string> {
  const map: Record<string, string> = {};
  for (const item of error.errors ?? []) {
    if (item.field && !map[item.field]) {
      map[item.field] = item.message;
    }
  }
  for (const field of error.fields ?? []) {
    if (!map[field]) {
      map[field] = error.message;
    }
  }
  return map;
}
