import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {authApi} from "../../api/api";
import {IUser} from "../../types/user";
import {State} from "../redux-store";

const initialState = {
    isAuthorized: false,
    currentUser: null as IUser | null,
    token: '',
    error: ''
}

export type InitialStateType = typeof initialState

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuthorized(state: InitialStateType) {
            state.isAuthorized = true
        },
        setError(state: InitialStateType) {
            state.error = 'Something went wrong...'
        },
        logout(state: InitialStateType) {
            state.isAuthorized = false
            state.currentUser = null
            state.token = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state: InitialStateType, action) => {
                state.currentUser = action.payload.dataUser
                state.token = action.payload.dataToken.token
                state.isAuthorized = true
            })
            .addCase(login.rejected, (state: InitialStateType) => {
                state.error = 'Something went wrong...'
                state.isAuthorized = false
            })
    },
});

export const {setError, setAuthorized, logout} = authSlice.actions

export const login = createAsyncThunk(
    'auth/login',
    async ({email, password}: { email: string, password: string }) => {
        const dataToken = await authApi.login(email, password);
        const dataUser: IUser = await authApi.getUser(email, dataToken.token);
        return {dataUser, dataToken}
    }
)

export const createUser = createAsyncThunk(
    'auth/createUser',
    async (data: {email: string, password: string}, {getState}) => {
        const state = getState() as State

        await authApi.createUser(data, state.auth.token);
    }
)

export default authSlice.reducer;