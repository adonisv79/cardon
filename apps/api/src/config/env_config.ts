import { Static, Type } from "@sinclair/typebox";

export const EnvSchema = Type.Object({
  API_PORT: Type.Number({ default: 3000 }),
  DATABASE_URL: Type.String(),
  NODE_ENV: Type.Union(
    [
      Type.Literal("development"),
      Type.Literal("production"),
      Type.Literal("test"),
    ],
    { default: "development" },
  ),
  REDIS_URL: Type.String({ default: "redis://localhost:6379" }),
});

export type EnvConfig = Static<typeof EnvSchema>;
