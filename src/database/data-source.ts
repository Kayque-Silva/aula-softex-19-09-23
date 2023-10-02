import { DataSource } from "typeorm"
import { User } from "../entities/user";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "kayque",
    password: "kayque123",
    database: "api-softex",
    entities: [User],
    synchronize: true,
});

