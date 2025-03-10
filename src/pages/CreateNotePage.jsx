import React from "react";
import NoteForm from "../components/NoteForm";

const CreateNotePage = () => {
  return <NoteForm method="create" route="/api/v1/notas/" />;
};

export default CreateNotePage;
