import TodoModel from "./todo/model";

export default class Context {
  todo: TodoModel;

  constructor(connection: object, schema: object, req?: any, auth?: any) {
    this.todo = new TodoModel(connection, this);
  }
}
