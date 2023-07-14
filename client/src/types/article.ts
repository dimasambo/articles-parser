import {IUser} from "./user";

export interface IArticle {
    id: number
    title: string
    content: string
    userId: number
    author: IUser
    createdAt: string
    updatedAt: string
}

export interface ICreateArticle {
    title: string
    content: string
    userId: number
}