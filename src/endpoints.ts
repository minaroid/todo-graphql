import connection from "./database/connection";
import Context from "./schema/context";

export const setupWithoutAuthContext = (connection: object, schema: object) => {
  return new Context(connection, schema);
};

export const saveTodo = (schema: any) => {
  console.log("Hello saveTodo=>" + JSON.stringify(schema));

  return async (req: any, res: any): Promise<void> => {
    const ctx = await setupWithoutAuthContext(connection, schema);
    let classData = req.body;
    try {
      const todo = await ctx.todo.save(classData);

      res.send(todo || null);
    } catch (error: any) {
      console.log(`error while save new todo`, error);
      res.status(400).send({
        message: `error while save new todo, ${error}`,
        error,
      });
      return;
    }
  };
};

export const saveTodoTest = (schema: any) => {
  console.log("Hello saveTodoTest=>" + JSON.stringify(schema));
  return async (req: any, res: any): Promise<void> => {
    const ctx = await setupWithoutAuthContext(connection, schema);
    let classData = req.body;
    try {
      const todo = await ctx.todo.save(classData);
      //   if (gymClass.errors && gymClass.errors.length > 0) {
      //     res.status(400).send({
      //       message: `error in external class for external Id: ${classData.externalId}, ${gymClass.errors}`,
      //       error: gymClass.errors,
      //     });
      //     return;
      //   }
      res.send(todo || null);
    } catch (error: any) {
      console.log(`error while save new todo`, error);
      res.status(400).send({
        message: `error while save new todo, ${error}`,
        error,
      });
      return;
    }
  };
};
