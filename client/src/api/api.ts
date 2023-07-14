import axios from "axios";
import {IUser} from "../types/user";
import {IArticle, ICreateArticle} from "../types/article";

export const authApi = {
    login(email: string, password: string) {
        return axios.post<any>(`http://localhost:3000/auth/login`, {email, password})
            .then(response => response.data)
    },

    getUser(email: string, token: string) {
        return axios.get<IUser>(`http://localhost:3000/users/current?email=${email}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => response.data)
    },

    createUser(data: { email: string, password: string }, token: string) {
        return axios.post<IUser>(`http://localhost:3000/users`, data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => response.data)
    },
}

export const articleApi = {

    setArticle(article: ICreateArticle, token: string) {
        return axios.post<IArticle[]>(`http://localhost:3000/articles`, article, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => response.data)
    },

    getAllArticles(offset = 0, sort = 'DEFAULT') {
        return axios.get<IArticle[]>(`http://localhost:3000/articles?offset=${offset}&count=5&sort=${sort}`)
            .then(response => response.data)
    },

    searchArticles(offset = 0, sort = 'DEFAULT', searchString: string) {
        return axios.get<IArticle[]>(
            `http://localhost:3000/articles/search?offset=${offset}&count=5&sort=${sort}&searchString=${searchString}`
        )
            .then(response => response.data)
    }
}