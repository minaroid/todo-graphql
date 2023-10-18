import Context from "../context";

export default {
  Query: {
    getAll(root: any, args: any, context: Context) {
      console.log("ressssolver");
      return context.todo.getAll();
    },
  },
};
