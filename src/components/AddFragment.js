import React from "react";
import DraftCard from "./DraftCard";
import { Grid } from "@mui/material";

const AddFragment = ({ drafts, onEdit }) => {
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
        <DraftCard draft={draft} onEdit={onEdit} />
      ))}
      <DraftCard draft={{ title: "1", description: "1" }} onEdit={onEdit} />
    </Grid>
  );
};

export default AddFragment;
