import { Model } from "sequelize-typescript";
import { User } from "../users/user.model";
interface ArticleCreationAttrs {
    title: string;
    content: string;
    userId: number;
}
export declare class Article extends Model<Article, ArticleCreationAttrs> {
    id: number;
    title: string;
    content: string;
    userId: number;
    author: User;
}
export {};
