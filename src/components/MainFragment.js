import React from "react";
import { useState, useEffect } from "react";
import RecipeCard from "./RecipeCard";
import { Grid } from "@mui/material";

const MainFragment = ({ recipes, expandRecipe }) => {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  const handleResize = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
  }, []);

  return (
    <Grid
      container
      gap={2}
      direction="row"
      justify="center"
      paddingTop="10px"
      paddingLeft="10px"
      paddingRight="10px"
    >
      {recipes.map((recipe, index) => (
        <Grid item xs>
          <RecipeCard
            key={index}
            width={width / Math.floor(width / 365) - 25}
            recipe={recipe}
            expandRecipe={() => expandRecipe(recipe)}
          />
        </Grid>
      ))}
    </Grid>
  );
};

MainFragment.defaultProps = {
  recipes: [],
};

export default MainFragment;
