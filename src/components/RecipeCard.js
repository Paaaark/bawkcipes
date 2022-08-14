import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useState } from "react";

function RecipeCard({ recipe, expandRecipe }) {
  const [cardColor, setCardColor] = useState("#ffffff");

  const onMouseOver = () => {
    setCardColor("#C9C9C9");
  };
  const onMouseOut = () => {
    setCardColor("#ffffff");
  };

  return (
    <Card
      sx={{ width: 345 }}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      onClick={expandRecipe}
    >
      <CardMedia
        component="img"
        height="140"
        image="/static/images/cards/contemplative-reptile.jpg"
        alt="green iguana"
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
  );
}

export default RecipeCard;
