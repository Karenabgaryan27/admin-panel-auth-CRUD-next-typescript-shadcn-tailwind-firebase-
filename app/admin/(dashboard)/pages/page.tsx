"use client";

import React, { useState, useEffect } from "react";
import { useApiContext } from "@/contexts/ApiContext";
import { InputDemo, ButtonDemo } from "@/components/index";

const Pages = () => {
  return (
    <main className="pages-page p-5">
      <h2 className="text-2xl">Pages</h2>
      <AddMovie />
      <Movies />
    </main>
  );
};

const Movies = () => {
  const { state, getMovies } = useApiContext();

  useEffect(() => {
    getMovies({});
  }, []);

  return (
    <div className="flex gap-5 flex-wrap mb-[500px] justify-center md:justify-start">
      {state.movies.isLoading
        ? "loading..."
        : !state.movies.list.length
        ? "empty"
        : state.movies.list.map((item, index) => {
            return <SingleMovie key={index} {...{ ...item }} />;
          })}
    </div>
  );
};

const SingleMovie = ({ id = "", name = "", releaseDate = "" }) => {
  const [state, setState] = useState({ name: "", releaseDate: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const { deleteMovie, updateMovie } = useApiContext();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateMovie({
      id,
      name: state.name || name,
      releaseDate: state.releaseDate || releaseDate,
      setIsLoading,
    });
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const deleteSingleMovie = (id: string = "") => {
    deleteMovie({ id });
  };
  return (
    <div className="shadow rounded-lg p-3 flex-1 min-w-[250px] max-w-[250px]">
      <div className="flex gap-3 items-center mb-3">
        <h2 className="text-xs font-bold">{name}</h2>
        <div>{releaseDate}</div>
      </div>

      <form action="" onSubmit={onSubmit}>
        <InputDemo
          placeholder="Name"
          name="name"
          type="text"
          callback={(e) => onChange(e)}
          className="mb-3"
        />
        <InputDemo
          type="number"
          placeholder="Release date"
          name="releaseDate"
          callback={(e) => onChange(e)}
          className="mb-3"
        />
        <ButtonDemo
          text={`${isLoading ? "Updating..." : "Update Movie"}`}
          className={`w-full mb-3 text-sm`}
          disabled={isLoading}
        />
      </form>
      <ButtonDemo text="Delete" variant="destructive" onClick={() => deleteSingleMovie(id)} />
    </div>
  );
};

const AddMovie = () => {
  const [state, setState] = useState({ name: "", releaseDate: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const { addMovie } = useApiContext();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addMovie({ name: state.name, releaseDate: state.releaseDate, setIsLoading });
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="wrapper  w-full max-w-[360px] mx-auto shadow-lg !p-5 border border-gray-100 rounded-[15px] mb-[100px]">
      <form onSubmit={onSubmit} className="m-5 max-w-[360px] mx-auto">
        <h2 className="text-2xl text-center mb-5">Add Movie</h2>

        <InputDemo
          label="name"
          placeholder="name"
          name="name"
          type="text"
          callback={(e) => onChange(e)}
          className="mb-5"
        />

        <InputDemo
          label="Release date"
          placeholder="Release date"
          name="releaseDate"
          type="number"
          callback={(e) => onChange(e)}
          className="mb-5"
        />

        <ButtonDemo
          text={`${isLoading ? "Adding..." : "Add Movie"}`}
          className={`w-full mb-5 text-sm`}
          disabled={isLoading}
        />
      </form>
    </div>
  );
};

export default Pages;
