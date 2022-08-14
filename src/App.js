import React from "react";
import { useState } from "react";
import TopAppBar from "./components/TopAppBar";
import FloatingActionButton from "./components/FloatingActionButton";
import AddFragment from "./components/AddFragment";
import { ThemeProvider } from "@mui/material/styles";
import myTheme from "./myTheme";
import EditingDraft from "./components/EditingDraft";
import db from "./firebase";
import { getDocs, collection } from "firebase/firestore";
import MainFragment from "./components/MainFragment";

const App = () => {
  React.useEffect(() => {
    getDrafts();
    getRecipes();
  }, []);

  async function getDrafts() {
    const snapshot = await getDocs(collection(db, "drafts"));
    const drafts = snapshot.docs.map((doc) => {
      const data = doc.data();
      data.key = doc.id;
      return data;
    });
    setDrafts(drafts);
    console.log(drafts);
  }

  async function getRecipes() {
    const snapshot = await getDocs(collection(db, "recipes"));
    const recipes = snapshot.docs.map((doc) => doc.data());
    setRecipes(recipes);
  }

  const [fragmentStatus, setFragmentStatus] = useState("main");
  const [currentEditingDraft, setCurrentEditingDraft] = useState();
  const [drafts, setDrafts] = useState([]);
  const [recipes, setRecipes] = useState([
    { title: "Manual", description: "Manual" },
  ]);

  const toAdd = () => {
    setFragmentStatus("add");
  };

  const toMain = () => {
    setFragmentStatus("main");
  };

  const expandRecipe = (recipe) => {
    console.log(recipe);
    console.log("Card clicked");
  };

  const editDraft = (draft) => {
    setFragmentStatus("edit");
    setCurrentEditingDraft(draft);
  };

  const saveDraft = (draft) => {
    setFragmentStatus("add");
    setDrafts((oldDrafts) =>
      oldDrafts.map((oldDraft) => (oldDraft.id === draft.id ? draft : oldDraft))
    );
  };

  const getTopBarStatus = () => {
    switch (fragmentStatus) {
      case "add":
        return "Saved Drafts";
      case "edit":
        return "Editing Recipe";
      case "main":
      default:
        return "Bawkcipes";
    }
  };

  const renderMainFragment = () => {
    switch (fragmentStatus) {
      case "add":
        return <AddFragment drafts={drafts} onEdit={editDraft} />;
      case "edit":
        return (
          <EditingDraft draft={currentEditingDraft} onSaveDraft={saveDraft} />
        );
      case "main":
      default:
        return <MainFragment recipes={recipes} expandRecipe={expandRecipe} />;
    }
  };

  return (
    <ThemeProvider theme={myTheme}>
      <TopAppBar title={getTopBarStatus()} toMain={toMain} toAdd={toAdd} />
      {fragmentStatus === "main" ? (
        <div onClick={toAdd}>
          <FloatingActionButton />
        </div>
      ) : (
        ""
      )}

      {renderMainFragment()}
    </ThemeProvider>
  );
};

export default App;
