import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { Stack } from "@mui/system";
import { useTheme } from "@emotion/react";
import { Button } from "@mui/material";
import Divider from "@mui/material/Divider";
import styles from "../styles.css";

const EditingDraft = ({ draft }) => {
  const theme = useTheme();
  if (!("steps" in draft)) draft.steps = [];
  const [title, setTitle] = useState(draft.title);
  const [desc, setDesc] = useState(draft.description);
  const [steps, setSteps] = useState(draft.steps);
  const [titleOnEdit, setTitleOnEdit] = useState(false);
  const [descOnEdit, setDescOnEdit] = useState(false);

  console.log(draft);

  const onAddSteps = () => {
    setSteps([...steps, ""]);
  };

  const toggleTitle = (e) => {
    setTitleOnEdit(!titleOnEdit);
  };

  const toggleDesc = (e) => {
    setDescOnEdit(!descOnEdit);
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
          textAlign: "center",
          textTransform: "uppercase",
          cursor: "pointer",
        }}
      >
        <h3>{title}</h3>
      </div>
    );
  };

  const getDescText = () => {
    return (
      <div
        onClick={toggleDesc}
        style={{ textAlign: "center", cursor: "pointer" }}
      >
        <p style={{ color: "#999999" }}>{desc}</p>
      </div>
    );
  };

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      paddingLeft="10px"
      paddingTop="10px"
    >
      <Grid
        container
        width="100vw"
        maxWidth="1000px"
        bgcolor="white"
        direction="column"
        alignItems="center"
      >
        <div className="textBox">
          <Stack spacing={0.5} direction="column">
            {titleOnEdit
              ? getTextField("Title", title, toggleTitle, setTitle, false)
              : getTitleText()}
            {descOnEdit
              ? getTextField("Description", desc, toggleDesc, setDesc, true)
              : getDescText()}
            <h2>Recipe</h2>
            {steps.map((step, index) =>
              getTextField("Step " + (index + 1), "")
            )}
            <Button color="secondary" variant="outlined" onClick={onAddSteps}>
              Add Steps
            </Button>
            <Divider style={{ marginTop: "10px", marginBottom: "10px" }} />
            <Grid container spacing={0.5} direction="row">
              <Grid item xs>
                <Button fullWidth color="secondary" variant="outlined">
                  Save Draft
                </Button>
              </Grid>
              <Grid item xs>
                <Button fullWidth color="secondary" variant="outlined">
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
