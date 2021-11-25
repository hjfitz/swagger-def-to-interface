export const AddShipmentDetailsRequestBodySchema = {
  orderId: {
    type: "string",
  },
  trackingNumber: {
    type: "string",
    required: true,
  },
  trackingUrl: {
    type: "string",
    required: true,
  },
  courier: {
    type: "string",
    required: true,
  },
  eta: {
    type: "string",
    required: true,
  },
  message: {
    type: "string",
    required: true,
  },
  status: {
    type: "string",
    required: true,
  },
};
