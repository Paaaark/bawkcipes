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
import RecipeFragment from "./components/RecipeFragment";

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
  const [viewingRecipe, setViewingRecipe] = useState({
    title: "",
    description: "",
  });
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
    setFragmentStatus("recipe");
    setViewingRecipe(recipe);
  };

  const editDraft = (draft) => {
    setFragmentStatus("edit");
    setCurrentEditingDraft(draft);
  };

  const onCreate = () => {
    setFragmentStatus("edit");
    setCurrentEditingDraft({
      id: "onCreate id",
    });
  };

  const saveDraft = (newDraft) => {
    setFragmentStatus("add");
    setDrafts(
      drafts.map((oldDraft) =>
        oldDraft.id === newDraft.id ? newDraft : oldDraft
      )
    );
    if (!drafts.find((oldDraft) => oldDraft.id === newDraft.id)) {
      setDrafts([...drafts, newDraft]);
    }
  };

  const getTopBarStatus = () => {
    switch (fragmentStatus) {
      case "add":
        return "Saved Drafts";
      case "edit":
        return "Editing Recipe";
      case "recipe":
        return viewingRecipe.title;
      case "main":
      default:
        return "Bawkcipes";
    }
  };

  const renderMainFragment = () => {
    switch (fragmentStatus) {
      case "add":
        return (
          <AddFragment drafts={drafts} onEdit={editDraft} onCreate={onCreate} />
        );
      case "edit":
        return (
          <EditingDraft draft={currentEditingDraft} onSaveDraft={saveDraft} />
        );
      case "recipe":
        return <RecipeFragment recipe={viewingRecipe} />;
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
