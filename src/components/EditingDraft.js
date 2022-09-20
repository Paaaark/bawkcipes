import React, { useEffect, useRef, useState } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { Stack } from "@mui/system";
import { Button } from "@mui/material";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import styles from "../styles.css";
import db, { storage } from "../firebase";
import { getDownloadURL, ref } from "firebase/storage";
import { useParams, useNavigate } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";

const EditingDraft = ({ drafts, onSaveDraft, uploadDraft }) => {
  let { id } = useParams();
  const navigate = useNavigate();
  const mainDiv = useRef(null);
  const [draft, setDraft] = useState(null);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [steps, setSteps] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [amounts, setAmounts] = useState([]);
  const [ingredientsToggle, setIngredientsToggle] = useState([]);
  const [amountsToggle, setAmountsToggle] = useState([]);
  const [image, setImage] = useState(null);
  const [imagePath, setImagePath] = useState(null);
  const [imageUploaded, setImageUploaded] = useState(false);
  const [titleOnEdit, setTitleOnEdit] = useState(false);
  const [descOnEdit, setDescOnEdit] = useState(false);
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    for (const value of Object.values(drafts)) {
      if (value.id === id) setDraft(value);
    }
    if (draft === null) {
      queryDraft();
    }
    setDimensions({
      width: mainDiv.current.offsetWidth,
      height: Math.floor(mainDiv.current.offsetWidth / 16),
    });
    window.addEventListener("resize", handleResize, false);
  }, []);

  useEffect(() => {
    if (draft === null) return;
    if (draft.imageUploaded) {
      getDownloadURL(ref(storage, draft.imagePath)).then((url) => {
        setImagePath(url);
      });
    }
    if (draft.steps === null) draft.steps = [];
    if (draft.title) setTitle(draft.title);
    if (draft.description) setDesc(draft.description);
    if (draft.steps) setSteps(draft.steps);
    if (draft.ingredients) setIngredients(draft.ingredients);
    if (draft.amounts) setAmounts(draft.amounts);
    if (draft.imagePath) setImagePath(draft.imagePath);
    if (draft.imageUploaded) setImageUploaded(draft.imageUploaded);
  }, [draft]);

  async function queryDraft() {
    const q = query(collection(db, "drafts"), where("id", "==", id));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setDraft(doc.data());
    });
  }

  const handleResize = () => {
    setDimensions({
      width: mainDiv.current.offsetWidth,
      height: Math.floor(mainDiv.current.offsetWidth / 16),
    });
    console.log("Window resized");
    console.log(dimensions);
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
                onBlur={(event) => {
                  setIngredientsToggle(
                    ingredientsToggle.map((entry, i) =>
                      i === index ? !entry : entry
                    )
                  );
                  setIngredients(
                    ingredients.map((entry, i) =>
                      i === index
                        ? event.target.value === ""
                          ? "Ingredient"
                          : entry
                        : entry
                    )
                  );
                }}
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
                onBlur={(event) => {
                  setAmountsToggle(
                    amountsToggle.map((entry, i) =>
                      i === index ? !entry : entry
                    )
                  );
                  setAmounts(
                    amounts.map((entry, i) =>
                      i === index
                        ? event.target.value === ""
                          ? "Amount"
                          : entry
                        : entry
                    )
                  );
                }}
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
            <Button
              color="secondary"
              variant="outlined"
              onClick={() => setSteps([...steps, ""])}
            >
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
                  onClick={() => {
                    onSaveDraft(getDraft());
                    navigate("/addDraft");
                  }}
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
