import React from 'react';
import {Card, CardContent} from "@mui/material";
import {useSelector} from "react-redux";
import {State} from "../../Redux/redux-store";
import {Link, Navigate} from 'react-router-dom';
import {StyledAdmin} from "./StyledAdmin";

export const Admin = () => {
    const {currentUser, isAuthorized} = useSelector((state: State) => state.auth)
    let isAdmin = false

    currentUser?.roles.forEach(role => {
        if(role.value === 'ADMIN') {
            isAdmin = true
        }
    })

    if (!isAuthorized || !isAdmin) return <Navigate replace to={'/login'} />
    return (
        <StyledAdmin>
            <Card className={'card'}>
                <Link to={'/admin/create-admin'}>
                    <CardContent>
                        Create Admin
                    </CardContent>
                </Link>
            </Card>
            <Card className={'card'}>
                <Link to={'/admin/create-article'}>
                    <CardContent>
                        Create article
                    </CardContent>
                </Link>
            </Card>
        </StyledAdmin>
    );
};