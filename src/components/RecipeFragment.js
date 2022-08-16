import React from "react";
import { Grid } from "@mui/material";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

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
          <Typography align="center" variant="h3">
            {recipe.title}
          </Typography>
          <Typography marginTop="5px" align="center" variant="body1">
            {recipe.description}
          </Typography>
          {recipe.steps.map((step, index) => (
            <div>
              <Typography variant="h5">{"Step " + (index + 1)}</Typography>
              <Typography variant="body1">{step}</Typography>
            </div>
          ))}
        </div>
      </Grid>
    </Grid>
  );
};

export default RecipeFragment;
