import React from "react";
import { Button, Grid } from "@mui/material";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
import DraftCard from "./DraftCard";
import { ref, getDownloadURL } from "firebase/storage";
import db, { storage } from "../firebase";
import { useParams } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";

const RecipeFragment = ({ recipes }) => {
  const [openRecipe, setOpenRecipe] = useState(false);
  const [imagePath, setImagePath] = useState(null);
  const [recipe, setRecipe] = useState(null);
  let { id } = useParams();

  useEffect(() => {
    for (const value of Object.values(recipes)) {
      if (value.title === id) setRecipe(value);
    }
    if (recipe === null) {
      queryRecipe();
    }
  }, []);

  useEffect(() => {
    processRecipe();
  }, [recipe]);

  async function queryRecipe() {
    const q = query(collection(db, "recipes"), where("title", "==", id));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setRecipe(doc.data());
      console.log(doc.data());
    });
  }

  const processRecipe = () => {
    if (recipe === null) return;
    if (recipe.imageUploaded) {
      getDownloadURL(ref(storage, recipe.imagePath)).then((url) => {
        setImagePath(url);
      });
    } else {
      getDownloadURL(ref(storage, "defaultFoodImage.png")).then((url) => {
        setImagePath(url);
      });
    }
    recipe.ingredients = recipe.ingredients ? recipe.ingredients : [];
    recipe.amounts = recipe.amounts ? recipe.amounts : [];
    recipe.steps = recipe.steps ? recipe.steps : [];
  };

  return recipe == null ? (
    <p>Loading</p>
  ) : (
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

          {/* Start: Recipe metadata */}
          <Grid container width="100%" direction="row">
            <Grid
              container
              width="50%"
              direction="column"
              justifyContent="center"
            >
              <Grid item zeroMinWidth>
                <Typography variant="h3" align="center">
                  {recipe.title}
                </Typography>
              </Grid>
              <Grid item zeroMinWidth>
                <Typography variant="body1" align="center">
                  {recipe.description}
                </Typography>
              </Grid>
            </Grid>
            <Grid
              container
              width="50%"
              direction="column"
              justifyContent="center"
            >
              {imagePath !== null ? (
                <img
                  width="100%"
                  src={imagePath}
                  style={{ objectFit: "cover" }}
                />
              ) : (
                ""
              )}
            </Grid>
          </Grid>
          {/* End: Recipe metadata */}

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

          {openRecipe ? (
            recipe.steps.length !== 0 ? (
              recipe.steps.map((step, index) => (
                <div key={index}>
                  <Typography variant="h5">{"Step " + (index + 1)}</Typography>
                  <Typography variant="body1">{step}</Typography>
                </div>
              ))
            ) : (
              <Typography variant="body1">Recipe not available.</Typography>
            )
          ) : (
            ""
          )}
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
