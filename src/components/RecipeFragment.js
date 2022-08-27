import React from "react";
import { Button, Grid } from "@mui/material";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import DraftCard from "./DraftCard";

const RecipeFragment = ({ recipe }) => {
  const [openRecipe, setOpenRecipe] = useState(false);

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
          <Stack direction="column"></Stack>
          <Typography align="center" variant="h3">
            {recipe.title}
          </Typography>
          <Typography marginTop="5px" align="center" variant="body1">
            {recipe.description}
          </Typography>

          {/* Start: Ingredients section */}
          <Typography variant="h5">Ingredients</Typography>
          {recipe.ingredients.map((ingredient, index) => (
            <div key={index}>
              <Grid container direction="row" justifyContent="flex-start">
                <Grid item xs>
                  <Typography variant="body1">
                    {recipe.ingredients[index]}
                  </Typography>
                </Grid>
                <Grid item xs>
                  <Typography variant="body1">
                    {recipe.amounts[index]}
                  </Typography>
                </Grid>
              </Grid>
            </div>
          ))}
          {/* End: Ingredients section */}

          {openRecipe
            ? recipe.steps.map((step, index) => (
                <div key={index}>
                  <Typography variant="h5">{"Step " + (index + 1)}</Typography>
                  <Typography variant="body1">{step}</Typography>
                </div>
              ))
            : ""}
        </div>
        <Button
          variant="text"
          fullWidth
          onClick={(event) => setOpenRecipe(!openRecipe)}
        >
          {openRecipe ? "Hide Recipe" : "See Recipe"}
        </Button>
      </Grid>
    </Grid>
  );
};

export default RecipeFragment;
