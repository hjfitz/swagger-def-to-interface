export interface SwaggerPropertyValue {
  type: string;
  format?: string;
  items?: SwaggerProperty | SwaggerPropertyValue;
  enum?: string[];
  $ref?: string;
  properties?: SwaggerProperty;
  required?: boolean;
  description?: string;
  default?: string;
  example?: string | number;
}

export type SwaggerProperty = Record<string, SwaggerPropertyValue>;

export interface StatusCodeSchema {
  description: string;
  schema?: SwaggerPropertyValue;
}

export interface SwaggerResponse {
  [code: number]: {
    description: string;
    schema?: SwaggerPropertyValue;
  };
}
