import React, {FC, useEffect} from 'react';
import { useFormik } from 'formik';
import { TextField, Button } from '@mui/material';
import {useDispatch} from "react-redux";
import {setSearchString} from "../../Redux/articles/articles-slice";
import {StyledForm} from "./StyledSearch";

interface ISearchComponentProps {
    onSearch: (searchString: string) => void
    initialValue: string
}

export const Search: FC<ISearchComponentProps> = ({ onSearch, initialValue }) => {

    const formik = useFormik({
        initialValues: {
            search: initialValue,
        },
        onSubmit: (values) => {
            onSearch(values.search)
        }
    })

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setSearchString(formik.values.search))
    }, [formik.values.search])

    return (
        <StyledForm onSubmit={formik.handleSubmit} className="search-form">
            <TextField
                id="search"
                name="search"
                label="Search by title"
                value={formik.values.search}
                onChange={formik.handleChange}
                variant="outlined"
                margin="normal"
                className="search-input"
            />
            <Button type="submit" variant="contained" color="primary" className="search-button">
                Search
            </Button>
        </StyledForm>
    )
}