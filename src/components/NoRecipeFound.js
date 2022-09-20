import React from "react";
import { useEffect, useState } from "react";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import Typography from "@mui/material/Typography";
import { relatedWords } from "../Backend";
import { getDocs, collection } from "firebase/firestore";
import db from "../firebase";

const NoRecipeFound = ({ recipes, keyword }) => {
  const [relatedRecipes, setRelatedRecipes] = useState(null);

  useEffect(() => {
    setRelatedRecipes(relatedWords({ keyword, recipes }));
    if (recipes.length < 2) {
      getRecipesFromDatabase();
    }
  }, []);

  useEffect(() => {
    setRelatedRecipes(relatedWords({ keyword, recipes }));
  }, [recipes]);

  async function getRecipesFromDatabase() {
    const snapshot = await getDocs(collection(db, "recipes"));
    recipes = snapshot.docs.map((doc) => doc.data());
  }

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: 10,
        flexDirection: "column",
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography align="center" variant="h5">
          Sorry, we couldn't find the recipe "{keyword}"
        </Typography>
      </div>
      <Typography align="center">Did you mean...</Typography>
      {relatedRecipes !== null
        ? relatedRecipes.map((recipe) => {
            return <Typography align="center">{recipe.title}</Typography>;
          })
        : ""}
    </div>
  );
};

export default NoRecipeFound;
