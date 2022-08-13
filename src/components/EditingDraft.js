import React from 'react'
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

const EditingDraft = ({ draft }) => {
  return (
    <Grid container direction='column' alignItems='center' paddingLeft="10px">
        <TextField fullWidth label="Title" variant="standard" defaultValue={draft.title}/>
    </Grid>
  )
}

EditingDraft.defaultProps = {
    draft: {
        title: "",
        description: "",
    },
}

export default EditingDraft