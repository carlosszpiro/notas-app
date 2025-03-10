import React, { useEffect, useState } from "react";
import api from "../api";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const NotePage = () => {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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

  const deleteNote = async () => {
    api
      .delete(`/api/v1/notas/${id}/`)
      .then((res) => {
        if (res.status === 204) {
          alert("Nota excluida!");
          navigate("/");
        } else alert("Erro ao excluira nota.");
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
  if (error) return <p>{error.message}</p>;
  if (!note) return <p>Nota não encontrada</p>;

  return (
    <section className="relative w-[80%] m-auto isolate flex flex-col gap-y-10 overflow-hidden bg-white px-1 py-24 sm:py-32 lg:px-8">
      <div className="flex justify-center w-full items-center gap-x-4 text-xs">
        <a
          className="z-10 rounded-lg bg-indigo-800 px-3 py-1.5 font-medium text-indigo-200 hover:bg-indigo-600 cursor-pointer"
          onClick={() => navigate("/")}
        >
          Voltar
        </a>
        <time className="text-gray-500">
          {new Date(note.criado_em).toLocaleDateString("pt-BR")}
        </time>
        <a className="relative z-10 rounded-full bg-gray-200 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
          {note.categoria === "PES"
            ? "Pessoal"
            : note.categoria === "COR"
            ? "Corporativo"
            : note.categoria === "EST"
            ? "Estudantil"
            : "Outros"}
        </a>

        <a
          className="z-10 rounded-lg bg-red-800 px-3 py-1.5 font-medium text-red-200 hover:bg-red-600 cursor-pointer ml-auto"
          onClick={deleteNote}
        >
          Deletar Nota
        </a>
      </div>
      <div className="mx-auto max-w-2xl lg:max-w-4xl">
        <p className="text-center mt-2 text-4xl font-bold tracking-tight text-pretty text-indigo-600 sm:text-5xl lg:text-balance">
          {note.titulo}
        </p>
        <blockquote className="mt-10 text-center text-xl/8 font-normal text-gray-900 sm:text-2xl/9">
          <p>{note.conteudo}</p>
        </blockquote>
      </div>
      <a
        className="z-10 text-xs w-fit rounded-lg bg-indigo-800 px-3 py-1.5 font-medium text-indigo-200 hover:bg-indigo-600 cursor-pointer"
        onClick={() => navigate(`/note/edit/${id}`)}
      >
        <i className="fa-solid fa-pen mr-2"></i>
        Editar nota
      </a>
    </section>
  );
};

export default NotePage;
