# @Cardon/API

This is the API for the Cardon game. It uses the following technologies:

- Fastify (web framework)
- Redis (in-memory data store)
- Prisma (ORM)
- PostgreSQL (database)

## Setup

1. Install dependencies:

```bash
npm install
```

2. Generate Prisma client:

```bash
npx prisma generate
```

3. Push the schema to the database:

```bash
npx prisma db push
```

4. Start the server:

```bash
npm run dev
```

## Applying changes in the Database

If you need to change the database schema, you can update the `prisma/schema.prisma` file and then run the following command:

```bash
npx prisma db push
```

Generate Prisma client:

```bash
npx prisma generate
```

## Applying changes in the Shared package

If you need to change the shared package, you can update the `packages/shared/src/index.ts` file and then run the following command:

```bash
npm run build
```

## Applying changes in the API package

If you need to change the API package, you can update the `apps/api/src/index.ts` file and then run the following command:

```bash
npm run dev
```
