import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../generated/prisma/client";

declare module "fastify" {
  interface FastifyInstance {
    prisma: PrismaClient;
  }
}

export const prismaPlugin = fp(async function (fastify: FastifyInstance) {
  const prisma = new PrismaClient({
    adapter: new PrismaPg({
      connectionString: fastify.config.DATABASE_URL,
      connectionTimeoutMillis: 5000,
    }),
  });

  fastify.decorate("prisma", prisma);

  fastify.addHook("onClose", async (instance) => {
    await instance.prisma.$disconnect();
  });
});
