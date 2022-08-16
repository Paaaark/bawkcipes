import React, { useEffect, useRef } from "react";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { Stack } from "@mui/system";
import { Button } from "@mui/material";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import styles from "../styles.css";

const EditingDraft = ({ draft, onSaveDraft, uploadDraft }) => {
  if (!("steps" in draft)) draft.steps = [];
  const ref = useRef(null);
  const [title, setTitle] = useState(draft.title);
  const [desc, setDesc] = useState(draft.description);
  const [steps, setSteps] = useState(draft.steps);
  const [image, setImage] = useState(null);
  const [titleOnEdit, setTitleOnEdit] = useState(false);
  const [descOnEdit, setDescOnEdit] = useState(false);
  const [dimensions, setDimensions] = React.useState({
    width: 0,
    height: 0,
  });

  const handleResize = () => {
    setDimensions({
      width: ref.current.offsetWidth,
      height: Math.floor(ref.current.offsetWidth / 16),
    });
    console.log("Window resized");
    console.log(dimensions);
  };

  useEffect(() => {
    setDimensions({
      width: ref.current.offsetWidth,
      height: Math.floor(ref.current.offsetWidth / 16),
    });
    window.addEventListener("resize", handleResize, false);
    console.log(dimensions);
  }, []);

  const onAddSteps = () => {
    setSteps([...steps, ""]);
  };

  const toggleTitle = (e) => {
    setTitleOnEdit(!titleOnEdit);
  };

  const toggleDesc = (e) => {
    setDescOnEdit(!descOnEdit);
  };

  const getDraft = (e) => {
    draft.title = title;
    draft.description = desc;
    draft.steps = steps;
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
        <Typography variant="h3" align="center">
          {title.length === 0 ? "Title" : title}
        </Typography>
      </div>
    );
  };

  const getDescText = () => {
    return (
      <div onClick={toggleDesc} style={{ cursor: "pointer" }}>
        <Typography variant="body1" align="center" color="#999999">
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
        <div ref={ref} className="textBox">
          <Stack spacing={0.5} direction="column">
            {image !== null ? (
              <img
                width={dimensions.width}
                height={dimensions.height}
                src={URL.createObjectURL(image)}
                style={{ objectFit: "cover" }}
              />
            ) : (
              ""
            )}
            <Button variant="outlined" component="label">
              ADD PHOTO
              <input
                type="file"
                hidden
                onChange={(event) => {
                  if (event.target.files) setImage(event.target.files[0]);
                }}
              />
            </Button>
            {titleOnEdit
              ? getTextField("Title", title, toggleTitle, setTitle, false)
              : getTitleText()}
            {descOnEdit
              ? getTextField("Description", desc, toggleDesc, setDesc, true)
              : getDescText()}
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
              Add Steps
            </Button>
            <Divider style={{ marginTop: "10px", marginBottom: "10px" }} />
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
          </Stack>
        </div>
      </Grid>
    </Grid>
  );
};

export default EditingDraft;
