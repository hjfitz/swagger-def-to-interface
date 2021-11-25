export const BasicRequestSchema = {
  orderId: {
    type: "string",
    required: true,
  },
  cardNumberLastFour: {
    type: "string",
    required: true,
  },
  anotherNestedProp: {
    type: "object",
    properties: {
      harry: {
        type: "string",
        required: true,
      },
      chloe: {
        type: "string",
      },
      zuko: {
        type: "object",
        properties: {
          food: {
            type: "string",
          },
          play: {
            type: "string",
            required: true,
          },
        },
      },
    },
  },
};

export const BasicResponseSchema = {
  200: {
    description: "Success",
    schema: {
      type: "object",
      properties: {
        id: {
          type: "string",
        },
        status: {
          type: "string",
        },
      },
    },
  },
  404: {
    description: "Not Found",
    schema: {
      type: "object",
      properties: {
        error: {
          type: "string",
          example: "No specified payment",
        },
        status: {
          type: "number",
          example: 404,
        },
      },
    },
  },
  400: {
    description: "Bad Request",
    schema: {
      type: "object",
      properties: {
        error: {
          type: "string",
          example: "Error capturing payment",
        },
        status: {
          type: "number",
          example: 400,
        },
      },
    },
  },
};
