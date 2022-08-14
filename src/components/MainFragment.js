import React from "react";
import RecipeCard from "./RecipeCard";
import { Grid } from "@mui/material";

const MainFragment = ({ recipes, expandRecipe }) => {
  return (
    <Grid
      container
      gap={2}
      direction="row"
      justify="flex-start"
      paddingTop="10px"
      paddingLeft="10px"
    >
      {recipes.map((recipe) => (
        <RecipeCard recipe={recipe} expandRecipe={() => expandRecipe(recipe)} />
      ))}
    </Grid>
  );
};

MainFragment.defaultProps = {
  recipes: [],
};

export default MainFragment;
