import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {articleApi} from "../../api/api";
import {ICreateArticle, IArticle} from "../../types/article";
import {State} from "../redux-store";

const initialState = {
    allArticles: [] as IArticle[],
    articles: [] as IArticle[],
    error: '',
    offset: 0,
    sort: 'DEFAULT',
    searchString: '',
}

export type InitialStateType = typeof initialState

const articlesSlice = createSlice({
    name: "articles",
    initialState,
    reducers: {
        setOffset(state: InitialStateType, action: PayloadAction<number>) {
            state.offset = action.payload
        },
        setSort(state: InitialStateType, action: PayloadAction<string>) {
            state.sort = action.payload
        },
        setSearchString(state: InitialStateType, action: PayloadAction<string>) {
            state.searchString = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(setArticle.fulfilled, (state: InitialStateType, action) => {
                state.articles = action.payload
                state.error = ''
            })
            .addCase(setArticle.rejected, (state: InitialStateType) => {
                state.error = 'Error occurred while creating post'
            })
            .addCase(requestAllArticles.fulfilled, (state: InitialStateType, action) => {
                state.allArticles = action.payload
                state.error = ''
            })
            .addCase(requestAllArticles.rejected, (state: InitialStateType) => {
                state.error = 'Error occurred while creating post'
            })
            .addCase(searchArticles.fulfilled, (state: InitialStateType, action) => {
                state.allArticles = action.payload
                state.error = ''
            })
            .addCase(searchArticles.rejected, (state: InitialStateType) => {
                state.error = 'Error occurred while search articles'
            })
    },
});

export const {setOffset, setSort, setSearchString} = articlesSlice.actions

export const setArticle = createAsyncThunk(
    'articles/setArticle',
    async (post: ICreateArticle, {getState}) => {
        const state = getState() as State

        const data: IArticle[] = await articleApi.setArticle(post, state.auth.token);
        return data;
    }
)

export const requestAllArticles = createAsyncThunk(
    'articles/requestAllArticles',
    async ({offset, sort}: {offset: number, sort: string}) => {
        const data: IArticle[] = await articleApi.getAllArticles(offset, sort);
        return data;
    }
)

export const searchArticles = createAsyncThunk(
    'articles/searchArticles',
    async ({offset, sort, searchString}: {offset: number, sort: string, searchString: string}) => {
        const data: IArticle[] = await articleApi.searchArticles(offset, sort, searchString);
        return data;
    }
)

export default articlesSlice.reducer;