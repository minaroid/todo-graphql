import { loadSchemaSync } from "@graphql-tools/load";
import { mergeResolvers } from "@graphql-tools/merge";
import { loadFilesSync } from "@graphql-tools/load-files";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { addResolversToSchema } from "@graphql-tools/schema";

import { join } from "path";

const allResolvers: any[] = loadFilesSync(
  join(__dirname, "./../schema/**/resolvers.*")
);
const mergedResolvers = mergeResolvers(allResolvers);
const schema = loadSchemaSync(join(__dirname, "./../schema/**/*.graphql"), {
  loaders: [new GraphQLFileLoader()],
});

let schemaWithResolvers = addResolversToSchema({
  schema,
  resolvers: mergedResolvers,
});

export default schemaWithResolvers;
