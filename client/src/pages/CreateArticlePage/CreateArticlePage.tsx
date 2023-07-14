import React from 'react';
import {CreateArticle} from "../../components/CreateArticle/CreateArticle";
import {useSelector} from "react-redux";
import {State} from "../../Redux/redux-store";
import {Navigate} from "react-router-dom";

export const CreateArticlePage = () => {
    const {currentUser, isAuthorized} = useSelector((state: State) => state.auth)
    let isAdmin = false

    currentUser?.roles.forEach(role => {
        if(role.value === 'ADMIN') {
            isAdmin = true
        }
    })

    if (!isAuthorized || !isAdmin) return <Navigate replace to={'/login'} />
    return (
        <div>
            {currentUser && <CreateArticle userId={currentUser.id} />}
        </div>
    );
};