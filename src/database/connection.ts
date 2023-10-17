import { join } from "path";
import { DataSource, DataSourceOptions } from "typeorm";

const options: DataSourceOptions = {
  type: "postgres",
  name: "default",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "admin",
  database: "todo",
  schema: "public",
  synchronize: true,
  logging: true,
  entities: [join(__dirname, "entities", "*.{ts,js}")],
};

const connection = new DataSource({ ...options });
export default connection;
