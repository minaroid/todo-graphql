import Todo from "./todo/model";

export default class Context {
  todo: Todo;

  constructor(connection: object, schema: object, req?: any, auth?: any) {
    this.todo = new Todo(connection, this);
  }
}
