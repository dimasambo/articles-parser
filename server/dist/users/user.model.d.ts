import { Model } from "sequelize-typescript";
import { Role } from "../roles/role.model";
import { Article } from "../articles/article.model";
interface UserCreationAttrs {
    email: string;
    password: string;
}
export declare class User extends Model<User, UserCreationAttrs> {
    id: number;
    email: string;
    password: string;
    roles: Role[];
    posts: Article[];
}
export {};
