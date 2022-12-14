import React from "react";
import { useState, useEffect } from "react";
import RecipeCard from "./RecipeCard";
import { Grid } from "@mui/material";

const MainFragment = ({ recipes, keyword }) => {
  const [width, setWidth] = useState(window.innerWidth);
  const [filteredRecipes, setFilteredRecipes] = useState(recipes);

  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setFilteredRecipes(recipes);
  }, [recipes]);

  useEffect(() => {
    setFilteredRecipes(
      recipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(keyword.toLowerCase())
      )
    );
  }, [keyword]);

  return (
    <Grid
      container
      spacing={2}
      direction="row"
      justify="center"
      paddingTop="10px"
      paddingLeft="10px"
      paddingRight="10px"
    >
      {filteredRecipes.map((recipe, index) => (
        <Grid item xs={12 / Math.floor(width / 365)}>
          <RecipeCard key={index} recipe={recipe} />
        </Grid>
      ))}
    </Grid>
  );
};

MainFragment.defaultProps = {
  recipes: [],
};

export default MainFragment;
