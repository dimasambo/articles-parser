import React, {FC} from 'react';
import {MenuItem, Select, SelectChangeEvent} from '@mui/material';

interface ISelectOption {
    value: string
    label: string
}

interface ISelectComponentProps {
    options: ISelectOption[]
    handleChange: (e: SelectChangeEvent<{ value: unknown }>) => void
    defaultValue: string
}

export const SelectComponent: FC<ISelectComponentProps> = ({ options, handleChange, defaultValue }) => {
    return (
        // @ts-ignore
        <Select onChange={handleChange} value={defaultValue} className={'select'}>
            {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                    {option.label}
                </MenuItem>
            ))}
        </Select>
    );
};
