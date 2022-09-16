import React from "react";
import { useState } from "react";
import TopAppBar from "./components/TopAppBar";
import FloatingActionButton from "./components/FloatingActionButton";
import AddFragment from "./components/AddFragment";
import { ThemeProvider } from "@mui/material/styles";
import myTheme from "./myTheme";
import EditingDraft from "./components/EditingDraft";
import db, { storage } from "./firebase";
import {
  getDocs,
  collection,
  setDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import MainFragment from "./components/MainFragment";
import RecipeFragment from "./components/RecipeFragment";
import { generateId, generateImageId } from "./Backend";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const App = () => {
  React.useEffect(() => {
    getDraftsFromDatabase();
    getRecipesFromDatabase();
  }, []);

  async function getDraftsFromDatabase() {
    const snapshot = await getDocs(collection(db, "drafts"));
    const drafts = snapshot.docs.map((doc) => {
      const data = doc.data();
      data.id = doc.id;
      return data;
    });
    setDrafts(drafts);
  }

  async function uploadDraftToDatabase(draft) {
    await setDoc(doc(db, "drafts", draft.id), draft);
  }

  async function getRecipesFromDatabase() {
    const snapshot = await getDocs(collection(db, "recipes"));
    const recipes = snapshot.docs.map((doc) => doc.data());
    setRecipes(recipes);
  }

  async function deleteDraftFromDatabase(draft) {
    await deleteDoc(doc(db, "drafts", draft.id));
  }

  async function uploadRecipeToDatabase(draft) {
    await setDoc(doc(db, "recipes", draft.id), draft);
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
    setCurrentEditingDraft({
      id: generateId(),
      title: "",
      description: "",
    });
    setFragmentStatus("edit");
  };

  const saveDraft = (newDraft) => {
    setFragmentStatus("add");
    if (newDraft.image !== null && !newDraft.imageUploaded) {
      const imageId = generateImageId();
      const storageRef = ref(storage, imageId);
      const imageFile = newDraft.image;
      uploadBytes(storageRef, imageFile);
      newDraft.imagePath = storageRef.fullPath;
      newDraft.imageUploaded = true;
      newDraft.image = "";
    } else {
      newDraft.image = "";
    }

    setDrafts(
      drafts.map((oldDraft) =>
        oldDraft.id === newDraft.id ? newDraft : oldDraft
      )
    );
    if (!drafts.find((oldDraft) => oldDraft.id === newDraft.id)) {
      setDrafts([...drafts, newDraft]);
    }
    console.log(newDraft);
    uploadDraftToDatabase(newDraft);
  };

  const deleteDraft = (newDraft) => {
    setFragmentStatus("add");
    setDrafts(drafts.filter((draft) => draft.id !== newDraft.id));
    deleteDraftFromDatabase(newDraft);
  };

  const uploadDraft = (newDraft) => {
    setFragmentStatus("main");
    setDrafts(drafts.filter((draft) => draft.id !== newDraft.id));
    setRecipes([...recipes, newDraft]);
    deleteDraftFromDatabase(newDraft);
    uploadRecipeToDatabase(newDraft);
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
          <AddFragment
            drafts={drafts}
            onEdit={editDraft}
            onCreate={onCreate}
            onDelete={deleteDraft}
          />
        );
      case "edit":
        return (
          <EditingDraft
            draft={currentEditingDraft}
            onSaveDraft={saveDraft}
            uploadDraft={uploadDraft}
          />
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
      <Router>
        <TopAppBar />
        <Routes>
          <Route
            path="/editingDraft"
            element={
              <EditingDraft
                draft={currentEditingDraft}
                onSaveDraft={saveDraft}
                uploadDraft={uploadDraft}
              />
            }
          />
          <Route
            path="/addDraft"
            element={
              <AddFragment
                drafts={drafts}
                onCreate={onCreate}
                onDelete={deleteDraft}
              />
            }
          />
          <Route
            path="/"
            element={
              <div>
                <MainFragment recipes={recipes} expandRecipe={expandRecipe} />
                <Link to="addDraft">
                  <FloatingActionButton />
                </Link>
              </div>
            }
          />
          <Route
            path="/recipe/:id"
            element={<RecipeFragment recipes={recipes} />}
          />
          <Route
            path="/draft/:id"
            element={
              <EditingDraft
                drafts={drafts}
                onSaveDraft={saveDraft}
                uploadDraft={uploadDraft}
              />
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
