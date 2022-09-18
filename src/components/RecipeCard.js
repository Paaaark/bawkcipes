import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function RecipeCard({ width, recipe, expandRecipe }) {
  const [cardColor, setCardColor] = useState("#ffffff");
  const [imagePath, setImagePath] = useState(null);

  useEffect(() => {
    if (recipe.imageUploaded) {
      getDownloadURL(ref(storage, recipe.imagePath)).then((url) => {
        setImagePath(url);
      });
    } else {
      getDownloadURL(ref(storage, "defaultFoodImage.png")).then((url) => {
        setImagePath(url);
      });
    }
  }, []);

  const onMouseOver = () => {
    setCardColor("#C9C9C9");
  };
  const onMouseOut = () => {
    setCardColor("#ffffff");
  };

  return (
    <Link to={"/recipe/" + recipe.title}>
      <Card
        sx={{ width: "100%" }}
        onMouseOver={onMouseOver}
        onMouseOut={onMouseOut}
        onClick={expandRecipe}
      >
        <CardMedia
          component="img"
          height="300"
          image={imagePath}
          alt={recipe.title}
        />
        <CardContent style={{ backgroundColor: cardColor }}>
          <Typography gutterBottom variant="h5" component="div">
            {recipe.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {recipe.description}
          </Typography>
        </CardContent>
        <CardActions style={{ backgroundColor: cardColor }}></CardActions>
      </Card>
    </Link>
  );
}

export default RecipeCard;
