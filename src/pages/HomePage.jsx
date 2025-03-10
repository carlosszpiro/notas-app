import React, { useEffect, useState } from "react";
import api from "../api";
import NoteSmall from "../components/NoteSmall";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = () => {
    api
      .get("/api/v1/notas/")
      .then((res) => res.data)
      .then((data) => {
        setNotes(data);
        console.log(data);
        setLoading(false);
      })
      .catch((err) => alert(err));
  };

  const deleteNote = (id) => {
    setLoading(true);
    api
      .delete(`/api/v1/notas/${id}/`)
      .then((res) => {
        if (res.status === 204) alert("Nota excluida!");
        else alert("Erro ao excluira nota.");
        getNotes();
        setLoading(false);
      })
      .catch((err) => alert(err));
  };

  if (loading)
    return (
      <div className="flex flex-row gap-2 justify-center items-center w-full h-lvh">
        <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
        <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.3s]"></div>
        <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
      </div>
    );

  return (
    <div>
      <div className="flex px-20 pt-16 gap-5">
        <a
          className="self-start text-sm z-10 rounded-lg bg-indigo-800 px-3 py-1.5 font-medium text-indigo-200 hover:bg-indigo-600 cursor-pointer"
          onClick={() => navigate("/logout")}
        >
          <i className="fa-solid fa-arrow-right-from-bracket mr-2"></i>
          Sair
        </a>
        <a
          className="self-start text-sm z-10 rounded-lg bg-green-800 px-3 py-1.5 font-medium text-green-200 hover:bg-green-600 cursor-pointer"
          onClick={() => navigate("/note/create/")}
        >
          Criar nota
        </a>
      </div>
      <div className="grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 px-20 pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
        {notes.map((note) => (
          <NoteSmall note={note} onDelete={deleteNote} key={note.id} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
