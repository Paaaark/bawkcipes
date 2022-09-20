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
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import MainFragment from "./components/MainFragment";
import RecipeFragment from "./components/RecipeFragment";
import { generateImageId } from "./Backend";
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
    drafts.forEach((draft) => {
      if (draft.imageUploaded) {
        getDownloadURL(ref(storage, draft.imagePath)).then((url) => {
          draft.downloadedImage = url;
        });
      } else {
        getDownloadURL(ref(storage, "defaultFoodImage.png")).then((url) => {
          draft.downloadedImage = url;
        });
      }
    });
    setDrafts(drafts);
  }

  async function uploadDraftToDatabase(draft) {
    await setDoc(doc(db, "drafts", draft.id), draft);
  }

  async function getRecipesFromDatabase() {
    const snapshot = await getDocs(collection(db, "recipes"));
    const recipes = snapshot.docs.map((doc) => doc.data());
    recipes.forEach((recipe) => {
      if (recipe.imageUploaded) {
        getDownloadURL(ref(storage, recipe.imagePath)).then((url) => {
          recipe.downloadedImage = url;
        });
      } else {
        getDownloadURL(ref(storage, "defaultFoodImage.png")).then((url) => {
          recipe.downloadedImage = url;
        });
      }
    });
    console.log(recipes);
    setRecipes(recipes);
  }

  async function deleteDraftFromDatabase(draft) {
    await deleteDoc(doc(db, "drafts", draft.id));
  }

  async function uploadRecipeToDatabase(draft) {
    let updates = {};
    Object.keys(draft).forEach((key) => {
      if (key !== "downloadedImage") updates[key] = draft[key];
    });
    await setDoc(doc(db, "recipes", draft.id), updates);
  }

  const [currentEditingDraft, setCurrentEditingDraft] = useState();
  const [drafts, setDrafts] = useState([]);
  const [recipes, setRecipes] = useState([
    { title: "Manual", description: "Manual" },
  ]);
  const [keyword, setKeyword] = useState("");

  const onCreate = (id) => {
    setDrafts([...drafts, { id: id, title: "", description: "" }]);
  };

  const saveDraft = (newDraft) => {
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
    setDrafts(drafts.filter((draft) => draft.id !== newDraft.id));
    deleteDraftFromDatabase(newDraft);
  };

  const uploadDraft = (newDraft) => {
    setDrafts(drafts.filter((draft) => draft.id !== newDraft.id));
    setRecipes([...recipes, newDraft]);
    deleteDraftFromDatabase(newDraft);
    uploadRecipeToDatabase(newDraft);
  };

  const searchRecipe = (newKeyword) => {
    setKeyword(newKeyword);
    console.log("searched word is " + newKeyword);
  };

  return (
    <ThemeProvider theme={myTheme}>
      <Router>
        <TopAppBar searchRecipe={searchRecipe} />
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
                <MainFragment recipes={recipes} keyword={keyword} />
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
