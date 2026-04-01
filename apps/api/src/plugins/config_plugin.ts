import { FastifyInstance } from "fastify";
import fastifyEnv from "@fastify/env";
import fp from "fastify-plugin";
import { EnvConfig, EnvSchema } from "../config/env_config";

declare module "fastify" {
  interface FastifyInstance {
    config: EnvConfig;
  }
}

export const configPlugin = fp(async function (fastify: FastifyInstance) {
  fastify.register(fastifyEnv, {
    schema: EnvSchema,
    dotenv: true,
    data: process.env,
    confKey: "config",
  });
});
