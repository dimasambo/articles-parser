import {IArticle} from "./article";
import {IRole} from "./role";

export interface IUser {
    id: number
    email: string
    password: string
    roles: IRole[]
    posts: IArticle[]
}

export interface ICreateUser {
    email: string
    password: string
    image: string
}