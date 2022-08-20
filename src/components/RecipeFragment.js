import React from "react";
import { Button, Grid } from "@mui/material";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";

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
