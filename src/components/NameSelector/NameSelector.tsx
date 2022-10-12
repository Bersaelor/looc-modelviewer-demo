import React from 'react';

import { Select } from '@mui/material';
import { MenuItem } from '@mui/material';
import { InputLabel } from '@mui/material';

export const NameSelector = ({
    title, names, index, selectIndex
}: {
    title: string,
    names: string[],
    index: number,
    selectIndex: (i: number) => void
}) => {

    return <>
        <InputLabel id="brand-select-label">{title}</InputLabel>
        <Select
            labelId="brand-select-label"
            id="brand-select"
            value={index}
            label="Age"
            onChange={e => selectIndex(e.target.value as number)}
        >
            {names.map((name, index) =>
                <MenuItem key={`item${index}`} value={index}>{name}</MenuItem>
            )}
        </Select>
    </>
}
