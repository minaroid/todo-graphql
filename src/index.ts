import { ApolloServer } from "apollo-server-express";
import connection from "./database/connection";
import express from "express";
import { getAllTodos, saveTodo } from "./endpoints";
import Context from "./schema/context";
import schema from "./helpers/loadSchema";

const port = 3000;
const host = "http://localhost";

export const setupWithoutAuthContext = (connection: object, schema: object) => {
  return new Context(connection, schema);
};

const startServer = async () => {
  const app = express();
  console.log(
    require("path").join(__dirname, "database", "entities", "*.{ts,js}")
  );
  try {
    await connection.initialize();

    app.use(express.json());

    app.post(`/todo`, saveTodo(schema));
    app.get(`/todos`, getAllTodos(schema));

    const server = new ApolloServer({
      schema,
      async context({}) {
        const ctx = await setupWithoutAuthContext(connection, schema);
        return ctx;
      },
      introspection: false,
    });
    await server.start();
    server.applyMiddleware({ app, path: "/graphql" });
  } catch (error: any) {
    console.log(error.message);
  }
  app.listen({ port }, () => console.log(`Server ready at ${host}:${port}`));
};

startServer();
