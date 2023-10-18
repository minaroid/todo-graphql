import { Todo as TodoEntity } from "../../database/entities/Todo";
import { createLoaders } from "./loaders";

export default class Todo {
  repository: any;
  connection: any;
  loaders: any;

  constructor(connection: any, context: any) {
    this.connection = connection;
    this.repository = connection.getRepository(TodoEntity);
    this.loaders = createLoaders(this);
  }

  async save(input: any) {
    console.log(input);
    console.log(input.title);

    try {
      const model = new TodoEntity();

      model.title = input.title;
      model.description = input.description;

      await this.connection.manager.save(model);
      return true;
    } catch (error: any) {
      return { errors: [error.message] };
    }
  }

  async getAll() {
    try {
      return await this.connection.manager.query("select * from todo;");
    } catch (error: any) {
      return { errors: [error.message] };
    }
  }
}
