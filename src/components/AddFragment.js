import React from "react";
import DraftCard from "./DraftCard";
import { Grid, IconButton, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const AddFragment = ({ drafts, onEdit, onCreate, onDelete }) => {
  return (
    <Grid
      container
      gap={2}
      direction="row"
      justify="flex-start"
      paddingTop="10px"
      paddingLeft="10px"
    >
      {drafts.map((draft) => (
        <DraftCard draft={draft} onEdit={onEdit} onDelete={onDelete} />
      ))}
      <Grid
        container
        width="345px"
        height="345px"
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <IconButton onClick={onCreate}>
            <AddIcon />
          </IconButton>
          <Typography variant="h5">Create a new draft!</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AddFragment;
