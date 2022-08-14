import React from "react";
import { Grid } from "@mui/material";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import styles from "../styles.css";

const RecipeFragment = ({ recipe }) => {
  return (
    <Grid container direction="column" alignItems="center" paddingTop="10px">
      <Grid
        container
        width="100vw"
        maxWidth="1000px"
        bgcolor="white"
        direction="column"
        alignItems="center"
      >
        <div className="textBox">
          <Stack spacing={0.5} direction="column"></Stack>
          <Typography align="center">{recipe.title}</Typography>
          <Typography align="center">{recipe.description}</Typography>
        </div>
      </Grid>
    </Grid>
  );
};

export default RecipeFragment;
