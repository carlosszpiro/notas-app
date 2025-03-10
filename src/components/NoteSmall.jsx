import React from "react";
import { useNavigate } from "react-router-dom";

const NoteSmall = ({ note, onDelete }) => {
  const date = new Date(note.criado_em).toLocaleDateString("pt-BR");
  const navigate = useNavigate();
  const categoria =
    note.categoria === "PES"
      ? "Pessoal"
      : note.categoria === "COR"
      ? "Corporativo"
      : note.categoria === "EST"
      ? "Estudantil"
      : "Outros";

  const handleNote = () => {
    navigate(`/note/${note.id}`);
  };

  return (
    <article className="flex max-w-xl flex-col items-start justify-between relative p-4 rounded-lg">
      <div className="flex w-full items-center gap-x-4 text-xs">
        <time className="text-gray-500">{date}</time>
        <a className="relative z-10 rounded-full bg-gray-200 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
          {categoria}
        </a>
        <a
          onClick={() => onDelete(note.id)}
          className="z-10 rounded-lg bg-red-800 px-3 py-1.5 font-medium text-red-200 hover:bg-red-600 cursor-pointer ml-auto"
        >
          Deletar Nota
        </a>
      </div>
      <div onClick={handleNote} className="cursor-pointer group relative">
        <h3 className="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
          <a>{note.titulo}</a>
        </h3>
        <p className="mt-5 line-clamp-3 text-sm/6 text-gray-600">
          {note.conteudo}
        </p>
      </div>
    </article>
  );
};

export default NoteSmall;
