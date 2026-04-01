import process from "node:process";
import packageJson from "../package.json";
try {
  process.loadEnvFile();
} catch (err) {
  // Ignore if .env file is not found
}
import Fastify from "fastify";
import swagger from "@fastify/swagger";
import swaggerUI from "@fastify/swagger-ui";
import { redisPlugin } from "./plugins/redis_plugin";
import { prismaPlugin } from "./plugins/prisma_plugin";
import { cardRoutes } from "./routes/cards";
import { configPlugin } from "./plugins/config_plugin";

const fastify = Fastify({ logger: true });

async function start() {
  await fastify.register(swagger, {
    openapi: {
      info: { title: packageJson.name, version: packageJson.version },
    },
  });

  await fastify.register(swaggerUI, { routePrefix: "/docs" });
  await fastify.register(configPlugin);

  await fastify.register(redisPlugin);
  await fastify.register(prismaPlugin);

  await fastify.register(cardRoutes);
  fastify.get("/status", async () => {
    const userCount = await fastify.prisma.user.count();
    const redisStatus = await fastify.redis.ping();
    return { users: userCount, redis: redisStatus };
  });

  try {
    await fastify.listen({
      port: Number(fastify.config.API_PORT),
      host: "0.0.0.0",
    });
    console.log(
      `🚀 Server ready at http://localhost:${fastify.config.API_PORT}/docs`,
    );
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

start();
