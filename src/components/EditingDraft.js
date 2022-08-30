import React, { useEffect, useRef } from "react";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { Stack } from "@mui/system";
import { Button } from "@mui/material";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import styles from "../styles.css";
import { storage } from "../firebase";
import { getDownloadURL, ref } from "firebase/storage";

const EditingDraft = ({ draft, onSaveDraft, uploadDraft }) => {
  if (!("steps" in draft)) draft.steps = [];
  const mainDiv = useRef(null);
  const [title, setTitle] = useState(draft.title);
  const [desc, setDesc] = useState(draft.description);
  const [steps, setSteps] = useState(draft.steps);
  const [ingredients, setIngredients] = useState(
    draft.ingredients ? draft.ingredients : []
  );
  const [amounts, setAmounts] = useState(draft.amounts ? draft.amounts : []);
  const [ingredientsToggle, setIngredientsToggle] = useState(
    //[Array(draft.ingredients.length).fill(false)]
    []
  );
  const [amountsToggle, setAmountsToggle] = useState(
    //Array(draft.amounts.length).fill(false)
    []
  );
  const [image, setImage] = useState(null);
  const [imagePath, setImagePath] = useState(
    draft.imagePath ? draft.imagePath : null
  );
  const [imageUploaded, setImageUploaded] = useState(
    draft.imageUploaded ? draft.imageUploaded : false
  );
  const [titleOnEdit, setTitleOnEdit] = useState(false);
  const [descOnEdit, setDescOnEdit] = useState(false);
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });

  const handleResize = () => {
    setDimensions({
      width: mainDiv.current.offsetWidth,
      height: Math.floor(mainDiv.current.offsetWidth / 16),
    });
    console.log("Window resized");
    console.log(dimensions);
  };

  useEffect(() => {
    setDimensions({
      width: mainDiv.current.offsetWidth,
      height: Math.floor(mainDiv.current.offsetWidth / 16),
    });
    window.addEventListener("resize", handleResize, false);
    if (draft.imageUploaded) {
      getDownloadURL(ref(storage, draft.imagePath)).then((url) => {
        setImagePath(url);
      });
    }
  }, []);

  const onAddSteps = () => {
    setSteps([...steps, ""]);
  };

  const onAddIngredient = () => {
    setIngredients([...ingredients, ""]);
    setIngredientsToggle([...ingredientsToggle, true]);
    setAmounts([...amounts, ""]);
    setAmountsToggle([...amountsToggle, true]);
  };

  const toggleTitle = (e) => {
    setTitleOnEdit(!titleOnEdit);
  };

  const toggleDesc = (e) => {
    setDescOnEdit(!descOnEdit);
  };

  const showIngredients = (e) => {
    return ingredients.map((ingredient, index) => {
      return (
        <Grid
          key={"Ingredients" + index}
          container
          direction="row"
          justifyContent="flex-start"
        >
          <Grid item xs>
            {ingredientsToggle[index] ? (
              <TextField
                label="Ingredient"
                defaultValue={ingredient}
                variant="standard"
                onBlur={() =>
                  setIngredientsToggle(
                    ingredientsToggle.map((entry, i) =>
                      i === index ? !entry : entry
                    )
                  )
                }
                onChange={(event) => {
                  setIngredients(
                    ingredients.map((entry, i) =>
                      i === index ? event.target.value : entry
                    )
                  );
                }}
              />
            ) : (
              <Typography
                variant="body2"
                onClick={() =>
                  setIngredientsToggle(
                    ingredientsToggle.map((entry, i) =>
                      i === index ? !entry : entry
                    )
                  )
                }
              >
                {ingredient}
              </Typography>
            )}
          </Grid>
          <Grid item xs>
            {amountsToggle[index] ? (
              <TextField
                label="Amount"
                defaultValue={amounts[index]}
                variant="standard"
                onBlur={() =>
                  setAmountsToggle(
                    amountsToggle.map((entry, i) =>
                      i === index ? !entry : entry
                    )
                  )
                }
                onChange={(event) => {
                  setAmounts(
                    amounts.map((entry, i) =>
                      i === index ? event.target.value : entry
                    )
                  );
                }}
              />
            ) : (
              <Typography
                variant="body2"
                onClick={() =>
                  setAmountsToggle(
                    amountsToggle.map((entry, i) =>
                      i === index ? !entry : entry
                    )
                  )
                }
              >
                {amounts[index]}
              </Typography>
            )}
          </Grid>
        </Grid>
      );
    });
  };

  const getDraft = (e) => {
    draft.title = title;
    draft.description = desc;
    draft.steps = steps;
    draft.image = image;
    draft.imageUploaded = imageUploaded;
    draft.ingredients = ingredients;
    draft.amounts = amounts;
    return draft;
  };

  const getTextField = (label, value, onBlur, onChange, multiLine) => {
    return (
      <TextField
        fullWidth
        label={label}
        variant="standard"
        defaultValue={value}
        onBlur={onBlur}
        multiline={multiLine}
        onChange={(event) => onChange(event.target.value)}
      />
    );
  };

  const getTitleText = () => {
    return (
      <div
        onClick={toggleTitle}
        style={{
          textTransform: "uppercase",
          cursor: "pointer",
        }}
      >
        <Typography
          variant="h3"
          align="center"
          style={{ overflowWrap: "break-word" }}
        >
          {title.length === 0 ? "Title" : title}
        </Typography>
      </div>
    );
  };

  const getDescText = () => {
    return (
      <div onClick={toggleDesc} style={{ cursor: "pointer" }}>
        <Typography
          variant="body1"
          align="center"
          color="#999999"
          style={{ overflowWrap: "break-word" }}
        >
          {desc.length === 0 ? "Description" : desc}
        </Typography>
      </div>
    );
  };

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
        <div ref={mainDiv} className="textBox">
          <Stack spacing={0.5} direction="column">
            <Grid container width="100vw" direction="row">
              {/* Start: Recipe metadata */}
              <Grid
                container
                width={dimensions.width / 2}
                height={dimensions.width / 2}
                direction="column"
                justifyContent="center"
              >
                <Grid item width={dimensions.width / 2} zeroMinWidth>
                  {titleOnEdit
                    ? getTextField("Title", title, toggleTitle, setTitle, false)
                    : getTitleText()}
                </Grid>
                <Grid item width={dimensions.width / 2} zeroMinWidth>
                  {descOnEdit
                    ? getTextField(
                        "Description",
                        desc,
                        toggleDesc,
                        setDesc,
                        true
                      )
                    : getDescText()}
                </Grid>
              </Grid>
              <Grid
                container
                width={dimensions.width / 2}
                direction="column"
                justifyContent="center"
              >
                {imagePath !== null ? (
                  <img
                    width={dimensions.width / 2}
                    height={dimensions.width / 2}
                    src={imagePath}
                    style={{ objectFit: "cover" }}
                  />
                ) : (
                  <Button variant="outlined" component="label">
                    ADD PHOTO
                    <input
                      type="file"
                      hidden
                      onChange={(event) => {
                        if (event.target.files) {
                          setImage(event.target.files[0]);
                          setImagePath(
                            URL.createObjectURL(event.target.files[0])
                          );
                          setImageUploaded(false);
                        }
                      }}
                    />
                  </Button>
                )}
              </Grid>
            </Grid>
            {/* End: Recipe metadata */}
            {/* Start: Ingredient section */}
            <Typography variant="h5">Ingredients</Typography>
            {showIngredients()}
            <Button
              color="secondary"
              variant="outlined"
              onClick={onAddIngredient}
            >
              Add an ingredient
            </Button>
            {/* End: Ingredient section */}
            <Divider style={{ marginTop: "10px", marginBottom: "10px" }} />
            {/* Start: Recipe section */}
            <Typography variant="h5">Recipe</Typography>
            {steps.map((step, index) => (
              <TextField
                fullWidth
                label={"Step " + (index + 1)}
                variant="standard"
                defaultValue={step}
                onChange={(event) =>
                  setSteps(
                    steps.map((step, i) =>
                      i === index ? event.target.value : step
                    )
                  )
                }
              />
            ))}
            <Button color="secondary" variant="outlined" onClick={onAddSteps}>
              Add a step
            </Button>
            {/* End: Recipe section */}
            <Divider style={{ marginTop: "10px", marginBottom: "10px" }} />
            {/* Start: Save buttons */}
            <Grid container spacing={1.5} direction="row">
              <Grid item xs>
                <Button
                  fullWidth
                  color="secondary"
                  variant="outlined"
                  onClick={() => onSaveDraft(getDraft())}
                >
                  Save Draft
                </Button>
              </Grid>
              <Grid item xs>
                <Button
                  fullWidth
                  color="secondary"
                  variant="outlined"
                  onClick={() => uploadDraft(getDraft())}
                >
                  Upload Recipe
                </Button>
              </Grid>
            </Grid>
            {/* End: Save buttons */}
          </Stack>
        </div>
      </Grid>
    </Grid>
  );
};

export default EditingDraft;
