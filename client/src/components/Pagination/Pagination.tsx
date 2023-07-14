import React, {FC} from 'react';
import {IconButton, Stack} from "@mui/material";
import {KeyboardArrowLeft, KeyboardArrowRight} from "@mui/icons-material";

interface IProps {
    handlePrevPage: () => void
    handleNextPage: () => void
    offset: number
    itemsLength: number
}

export const Pagination: FC<IProps> = ({handlePrevPage, handleNextPage, itemsLength, offset}) => {
    return <Stack direction="row" spacing={2} justifyContent="center" sx={{mt: 2}}>
        <IconButton
            aria-label="Previous Page"
            onClick={handlePrevPage}
            disabled={offset === 0}
        >
            <KeyboardArrowLeft/>
        </IconButton>
        <IconButton
            aria-label="Next Page"
            onClick={handleNextPage}
            disabled={itemsLength < 5}
        >
            <KeyboardArrowRight/>
        </IconButton>
    </Stack>
};