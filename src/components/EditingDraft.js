import React from 'react'
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Stack } from '@mui/system';
import { Button } from '@mui/material';
import styles from '../styles.css';

const EditingDraft = ({ draft }) => {
  return (
    <Grid container direction='column' alignItems='center' paddingLeft='10px' paddingTop="10px">
        <Grid container width="100vw" maxWidth="1000px" bgcolor='white' direction='column' alignItems='center'>
          <div className='textBox'>
            <Stack spacing={2} direction='column'>
              <TextField fullWidth label="Title" variant="standard" defaultValue={draft.title}/>
              <TextField fullWidth label="Description" variant="standard" defaultValue={draft.description}/>
              <h2>Recipes</h2>
              <Button color="secondary" variant="outlined">Add steps</Button>
            </Stack>
          </div>
        </Grid>
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