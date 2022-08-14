import React from "react";
import { useState } from "react";
import TopAppBar from "./components/TopAppBar";
import FloatingActionButton from "./components/FloatingActionButton";
import MediaCard from "./components/MediaCard";
import AddFragment from "./components/AddFragment";
import { ThemeProvider } from "@mui/material/styles";
import myTheme from "./myTheme";
import EditingDraft from "./components/EditingDraft";

const App = () => {
  let sampleData = [
    {
      id: "test1",
      title: "test1",
      description: "test1 desc",
    },
    {
      id: "test2",
      title: "test2",
      description: "test2 desc",
    },
  ];

  const [fragmentStatus, setFragmentStatus] = useState("main");
  const [currentEditingDraft, setCurrentEditingDraft] = useState();
  const [drafts, setDrafts] = useState(sampleData);

  const toAdd = () => {
    setFragmentStatus("add");
  };

  const toMain = () => {
    setFragmentStatus("main");
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
        return <h1>main</h1>;
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
