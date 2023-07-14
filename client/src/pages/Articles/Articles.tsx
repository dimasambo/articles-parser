import React, {FC, useEffect} from 'react';
import {StyledArticles} from "./StyledArticles";
import {ArticlesLine} from "../../components/ArticlesLine/ArticlesLine";
import {useDispatch, useSelector} from "react-redux";
import {requestAllArticles, searchArticles, setOffset, setSort} from "../../Redux/articles/articles-slice";
import {State} from "../../Redux/redux-store";
import {Pagination} from "../../components/Pagination/Pagination";
import {Search} from "../../components/Search/Search";
import {SelectChangeEvent} from "@mui/material";
import {SelectComponent} from "../../components/SelectComponent/SelectComponent";
import {AnyAction, ThunkDispatch} from "@reduxjs/toolkit";

const selectOptions = [
    {value: 'DEFAULT', label: 'DEFAULT'},
    {value: 'ASC', label: 'ASC'},
    {value: 'DESC', label: 'DESC'},
]

export const Articles: FC = ({  }) => {
    const {allArticles, offset, sort, searchString} = useSelector((state: State) => state.article)
    const dispatch: ThunkDispatch<State, undefined, AnyAction> = useDispatch()

    useEffect(() => {
        if(searchString === '') {
            dispatch(requestAllArticles({offset, sort}))
        } else {
            dispatch(searchArticles({offset, sort, searchString}))
        }
    }, [offset, sort])

    const handlePrevPage = () => {
        if (offset > 0) {
            dispatch(setOffset(offset - 5))
        }
    }

    const handleNextPage = () => {
        if (allArticles.length === 5) {
            dispatch(setOffset(offset + 5))
        }
    }

    const handleSearchSubmit = () => {
        dispatch(searchArticles({offset, sort, searchString}))
    }

    const handleSelectChange = (event: SelectChangeEvent<{ value: unknown }>) => {
        const selectedValue = event.target.value as string
        dispatch(setSort(selectedValue))
    }

    return (
        <StyledArticles>
            <div className={'articlesHandler'}>
                <Search onSearch={handleSearchSubmit} initialValue={searchString}/>
                <div className={'sortWrapper'}>
                    <SelectComponent options={selectOptions} handleChange={handleSelectChange} defaultValue={sort} />
                </div>
            </div>
            <ArticlesLine articles={allArticles} />
            <Pagination handlePrevPage={handlePrevPage} handleNextPage={handleNextPage}
                        offset={offset} itemsLength={allArticles.length} />
        </StyledArticles>
    );
};