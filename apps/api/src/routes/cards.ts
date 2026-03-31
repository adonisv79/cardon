import { FastifyInstance } from "fastify";
import { z } from "zod";

export async function cardRoutes(fastify: FastifyInstance) {
  // POST /cards - Create a new card definition
  fastify.post(
    "/cards",
    {
      schema: {
        description: "Create a new base card definition",
        body: {
          type: "object",
          required: ["name", "description", "imageUrl"],
          properties: {
            name: { type: "string" },
            description: { type: "string" },
            imageUrl: { type: "string" },
            manaCost: { type: "number" },
            cardType: {
              type: "string",
              enum: ["CREATURE", "SPELL", "HERO", "EQUIPMENT", "ACTION"],
            },
          },
        },
      },
    },
    async (request, reply) => {
      const { name, description, imageUrl, manaCost, cardType } =
        request.body as any;

      const newCard = await fastify.prisma.card.create({
        data: { name, description, imageUrl, manaCost, cardType },
      });

      return newCard;
    },
  );

  // GET /cards - List all cards
  fastify.get("/cards", async () => {
    return await fastify.prisma.card.findMany();
  });
}
