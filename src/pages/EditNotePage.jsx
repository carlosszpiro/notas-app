import React, { useState } from "react";
import NoteForm from "../components/NoteForm";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import api from "../api";

const EditNotePage = () => {
  const { id } = useParams();
  const [note, setNote] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getNote();
  }, [id]);

  const getNote = async () => {
    try {
      const res = await api.get(`/api/v1/notas/${id}/`);
      setNote(res.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div className="flex flex-row gap-2 justify-center items-center w-full h-lvh">
        <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
        <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.3s]"></div>
        <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
      </div>
    );
  if (error) return <p>{error.message}</p>;
  if (!note) return <p>Nota não encontrada</p>;

  return <NoteForm method="edit" route={`/api/v1/notas/${id}/`} note={note} />;
};

export default EditNotePage;
