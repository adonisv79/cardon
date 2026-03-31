// apps/api/src/index.ts
import process from "node:process";
try {
  process.loadEnvFile();
} catch (err) {
  // Ignore if .env file is not found
}
import Fastify from "fastify";
import swagger from "@fastify/swagger";
import swaggerUI from "@fastify/swagger-ui";
import { redisPlugin } from "./plugins/redis";
import { prismaPlugin } from "./plugins/prisma";
import { cardRoutes } from "./routes/cards";

const fastify = Fastify({ logger: true });

async function start() {
  // 1. Register Swagger
  await fastify.register(swagger, {
    openapi: {
      info: { title: "Don's Card Game API", version: "1.0.0" },
    },
  });

  await fastify.register(swaggerUI, { routePrefix: "/docs" });

  // 2. Register Redis
  await fastify.register(redisPlugin);
  await fastify.register(prismaPlugin);

  await fastify.register(cardRoutes);
  // 3. Simple Test Route (Using Redis & Prisma)
  fastify.get("/status", async () => {
    const userCount = await fastify.prisma.user.count();
    const redisStatus = await fastify.redis.ping();
    return { users: userCount, redis: redisStatus };
  });

  try {
    await fastify.listen({ port: 3000, host: "0.0.0.0" });
    console.log("🚀 Server ready at http://localhost:3000/docs");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

start();
