import React from 'react';
import {AuthForm, IFormValues} from "../../components/AuthForm/AuthForm";
import {useDispatch, useSelector} from "react-redux";
import {createUser, login} from "../../Redux/auth/auth-slice";
import {State} from "../../Redux/redux-store";
import {Navigate} from "react-router-dom";
import {AnyAction, ThunkDispatch} from "@reduxjs/toolkit";

export const CreateAdmin = () => {
    const {currentUser, isAuthorized} = useSelector((state: State) => state.auth)
    let isAdmin = false

    currentUser?.roles.forEach(role => {
        if(role.value === 'ADMIN') {
            isAdmin = true
        }
    })
    const dispatch: ThunkDispatch<State, undefined, AnyAction> = useDispatch()

    const handleSubmit = async (values: IFormValues, {setSubmitting}: { setSubmitting: (isSubmitting: boolean) => void }) => {
        try {
            await dispatch(createUser({email: values.email, password: values.password}))
            values.email = ''
            values.password = ''
            setSubmitting(false)
            alert('Success')
        } catch (error) {
            alert('Error')
        }
    }

    if (!isAuthorized || !isAdmin) return <Navigate replace to={'/login'} />
    return (
        <div>
            <h1>Create Admin</h1>
            <AuthForm handleSubmit={handleSubmit} buttonLabel={'Create admin'}/>
        </div>
    );
};