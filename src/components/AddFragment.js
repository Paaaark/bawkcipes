import React from "react";
import { useEffect, useState } from "react";
import DraftCard from "./DraftCard";
import { Grid, IconButton, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const AddFragment = ({ drafts, onEdit, onCreate, onDelete }) => {
  const [width, setWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
  }, []);

  return (
    <Grid
      container
      spacing={2}
      direction="row"
      justify="flex-start"
      paddingTop="10px"
      paddingLeft="10px"
    >
      {drafts.map((draft) => (
        <Grid item xs={12 / Math.floor(width / 365)}>
          <DraftCard draft={draft} onEdit={onEdit} onDelete={onDelete} />
        </Grid>
      ))}
      <Grid
        container
        xs={12 / Math.floor(width / 365)}
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
