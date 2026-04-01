import { FastifyInstance } from "fastify";

export async function cardRoutes(fastify: FastifyInstance) {
  // POST /cards - Create a new card definition
  fastify.post(
    "/cards",
    {
      schema: {
        summary: "Create a new base card definition",
        description: "Create a new base card definition",
        tags: ["Cards"],
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
  fastify.get(
    "/cards",
    {
      schema: {
        summary: "Retrieves the list of cards",
        description: "Retrieves the list of cards",
        tags: ["Cards"],
        response: {
          200: {
            type: "array",
            items: {
              type: "object",
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
      },
    },
    async () => {
      return await fastify.prisma.card.findMany();
    },
  );

  // GET /cards/:id - Get a card by ID
  fastify.get(
    "/cards/:id",
    {
      schema: {
        summary: "Retrieves a card by ID",
        description: "Retrieves a card by ID",
        tags: ["Cards"],
        response: {
          200: {
            type: "object",
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
    },
    async (request) => {
      const { id } = request.params as any;
      return await fastify.prisma.card.findUnique({ where: { id } });
    },
  );

  // PUT /cards/:id - Update a card by ID
  fastify.put(
    "/cards/:id",
    {
      schema: {
        summary: "Updates a card by ID",
        description: "Updates a card by ID",
        tags: ["Cards"],
        response: {
          200: {
            type: "object",
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
    },
    async (request) => {
      const { id } = request.params as any;
      const { name, description, imageUrl, manaCost, cardType } =
        request.body as any;
      return await fastify.prisma.card.update({
        where: { id },
        data: { name, description, imageUrl, manaCost, cardType },
      });
    },
  );

  // DELETE /cards/:id - Delete a card by ID
  fastify.delete(
    "/cards/:id",
    {
      schema: {
        summary: "Deletes a card by ID",
        description: "Deletes a card by ID",
        tags: ["Cards"],
        response: {
          200: {
            type: "object",
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
    },
    async (request) => {
      const { id } = request.params as any;
      return await fastify.prisma.card.delete({ where: { id } });
    },
  );
}
