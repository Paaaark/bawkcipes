import React from 'react'
import Fab from '@mui/material/Fab'
import AddIcon from '@mui/icons-material/Add'

export default function FloatingActionButton() {
    const style = {
        margin: 0,
        top: 'auto',
        right: 20,
        bottom: 20,
        left: 'auto',
        position: 'fixed',
    };
    return (
        <Fab size="large" color="secondary" aria-label="add" style={style}>
            <AddIcon/>
        </Fab>
    )
}