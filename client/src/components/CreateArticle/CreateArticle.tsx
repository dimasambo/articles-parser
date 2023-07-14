import React, {FC} from 'react';
import {Button, TextField} from '@material-ui/core';
import {Field, Formik} from 'formik';
import * as Yup from 'yup';
import {useDispatch} from "react-redux";
import {setArticle} from "../../Redux/articles/articles-slice";
import {StyledCreateArticle} from "./StyledCreateArticle";
import {AnyAction, ThunkDispatch} from "@reduxjs/toolkit";
import {State} from "../../Redux/redux-store";
import {createUser} from "../../Redux/auth/auth-slice";

interface CreateArticleProps {
    userId: number
}

const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    content: Yup.string().required('Content is required'),
})

export const CreateArticle: FC<CreateArticleProps> = ({userId}) => {

    const dispatch: ThunkDispatch<State, undefined, AnyAction> = useDispatch()

    const handleSubmit = async (values: { title: string; content: string }) => {
        try {
            await dispatch(setArticle({...values, userId}))
            values.title = ''
            values.content = ''
            alert('Success')
        } catch (error) {
            alert('Error')
        }
    }

    return (
        <Formik
            initialValues={{title: '', content: '', images: []}}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({values, errors, touched}) => (
                <StyledCreateArticle>
                    <Field
                        as={TextField}
                        name="title"
                        label="Title"
                        variant="outlined"
                        className={'input'}
                        error={touched.title && !!errors.title}
                        helperText={touched.title && errors.title}
                    />
                    <Field
                        as={TextField}
                        name="content"
                        label="Content"
                        variant="outlined"
                        className={'input'}
                        multiline
                        rows={4}
                        error={touched.content && !!errors.content}
                        helperText={touched.content && errors.content}
                    />

                    <Button style={{
                        height: '40px',
                        margin: 'auto 0',
                        width: '200px'
                    }} type="submit" variant="contained" color="primary">
                        Create article
                    </Button>
                </StyledCreateArticle>
            )}
        </Formik>
    )
}
