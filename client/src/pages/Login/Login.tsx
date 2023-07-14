import React from 'react';
import {StyledLogin} from "./StyledLogin";
import {useDispatch} from "react-redux";
import {login} from "../../Redux/auth/auth-slice";
import {useNavigate} from "react-router-dom";
import {AuthForm, IFormValues} from "../../components/AuthForm/AuthForm";
import {AnyAction, ThunkDispatch, unwrapResult} from '@reduxjs/toolkit';
import {State} from "../../Redux/redux-store";

export const Login = () => {
    const navigate = useNavigate()
    const dispatch: ThunkDispatch<State, undefined, AnyAction> = useDispatch()

    const handleSubmit = async (values: IFormValues, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
        try {
            const resultAction = await dispatch(login({ email: values.email, password: values.password }));
            const { dataUser, dataToken } = unwrapResult(resultAction);

            setSubmitting(false);
            values.email = ''
            values.password = ''
            navigate('/articles');
        } catch (error) {
            alert('Error')
        }
    }

    return (
        <StyledLogin>
            <h1>Login</h1>
            <AuthForm handleSubmit={handleSubmit} buttonLabel={'Login'}/>
        </StyledLogin>
    );
};