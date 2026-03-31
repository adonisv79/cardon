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
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";
import { redisPlugin } from "./plugins/redis";

const fastify = Fastify({ logger: true });
const prisma = new PrismaClient({
  adapter: new PrismaPg({
    connectionString: process.env.DATABASE_URL,
    connectionTimeoutMillis: 5000,
  }),
});

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

  // 3. Simple Test Route (Using Redis & Prisma)
  fastify.get("/status", async () => {
    const userCount = await prisma.user.count();
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
