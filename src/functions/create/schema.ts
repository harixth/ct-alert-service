export default {
  type: "object",
  properties: {
    userId: { type: "string" },
    email: { type: "string" },
    phone: { type: "string" },
    targetPrice: { type: "string" },
  },
  required: ["userId", "targetPrice"],
} as const;
