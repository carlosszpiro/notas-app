import React, { useEffect } from "react";
import api from "../api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const NoteForm = ({ method, route, note }) => {
  const navigate = useNavigate();
  const [titulo, setTitulo] = useState("");
  const [conteudo, setConteudo] = useState("");
  const [categoria, setCategoria] = useState("default");
  const [loading, setLoading] = useState(false);

  const isEditor = method === "edit";
  const name = isEditor ? "Editar Nota" : "Criar Nota";

  useEffect(() => {
    if (isEditor) {
      setTitulo(note.titulo);
      setConteudo(note.conteudo);
      setCategoria(note.categoria);
    }
  }, []);

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();

    if (isEditor) {
      try {
        api
          .put(route, { titulo, conteudo, categoria })
          .then(() => {
            setLoading(false);
            alert("Nota editada com sucesso!");
            navigate(`/note/${note.id}`);
          })
          .catch((err) => alert(err));
      } catch (err) {
        alert(err);
      }
    } else {
      api
        .post(route, { titulo, conteudo, categoria })
        .then((res) => {
          setLoading(false);
          alert("Nota criada com sucesso!");
          navigate(`/note/${res.data.id}`);
        })
        .catch((err) => alert(err));
    }
  };

  const handleCategoria = (e) => {
    try {
      setCategoria(e.target.value);
    } finally {
      console.log(categoria);
    }
  };

  const handleGoBack = () => {
    if (isEditor) {
      navigate(`/note/${note.id}`);
    } else {
      navigate("/");
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

  return (
    <div className="h-lvh w-full flex flex-col gap-10 items-center justify-center">
      <div className="flex w-[40%]">
        <a
          className="self-start text-sm z-10 rounded-lg bg-indigo-800 px-3 py-1.5 font-medium text-indigo-200 hover:bg-indigo-600 cursor-pointer"
          onClick={handleGoBack}
        >
          Voltar
        </a>
      </div>

      <p className="text-center mt-2 text-4xl font-bold tracking-tight text-pretty text-indigo-600 sm:text-5xl lg:text-balance">
        {name}
      </p>
      <form onSubmit={handleSubmit} className="w-[70%] lg:w-[40%] mx-auto">
        <div>
          <label
            htmlFor="titulo"
            className="block text-sm/6 font-medium text-gray-900"
          >
            Titúlo da Nota
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="titulo"
              id="titulo"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>
        </div>

        <label
          htmlFor="countries"
          className="block mb-2 text-sm font-medium text-gray-900 mt-5"
        >
          Escolha uma opção
        </label>
        <select
          id="countries"
          value={categoria}
          onChange={handleCategoria}
          className=" border mb-5 my-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-indigo-600 focus:border-blue-500 block w-full p-2.5 outline-indigo-500"
        >
          <option value="default">Escolha uma categoria</option>
          <option value="PES">Pessoal</option>
          <option value="COR">Corporativo</option>
          <option value="EST">Estudantil</option>
          <option value="OUT">Outros</option>
        </select>
        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="conteudo"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Conteúdo da Nota
            </label>
          </div>
        </div>
        <div className="mb-10 mt-2">
          <textarea
            type="password"
            name="conteudo"
            value={conteudo}
            onChange={(e) => setConteudo(e.target.value)}
            id="conteudo"
            className="block w-full rounded-md h-44 bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          />
        </div>
        <div>
          <button
            type="submit"
            className="cursor-pointer flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
};

export default NoteForm;
