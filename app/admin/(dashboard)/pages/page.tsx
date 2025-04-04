"use client";

import React, { useState, useEffect, useRef } from "react";
import { useApiContext } from "@/contexts/ApiContext";
import { InputDemo, ButtonDemo, BreadcrumbDemo } from "@/components/index";
import localData from "@/localData";
import useUtil from "@/hooks/useUtil";

const { placeholderImage } = localData.images;

const breadcrumbItems = [
  {
    href: "/",
    label: "Home",
  },
  {
    label: "Pages",
  },
];

const Pages = () => {
  return (
    <main className="pages-page p-5">
      <h2 className="text-2xl mb-3">Pages</h2>
      <BreadcrumbDemo items={breadcrumbItems} />
      <br />
      <br />

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
    <div className=" mb-[500px] grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-7">
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

const SingleMovie = ({ id = "", name = "", releaseDate = "", imageBase64 = placeholderImage }) => {
  const [state, setState] = useState({ name: "", releaseDate: 0, imageBase64: "" });
  const [isLoading, setIsLoading] = useState(false);
  const { deleteMovie, updateMovie } = useApiContext();

  const { compressImage, convertToBase64 } = useUtil();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateMovie({
      id,
      name: state.name,
      releaseDate: state.releaseDate,
      imageBase64: state.imageBase64,
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

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    try {
      const compressedBlob = await compressImage(file, 300); // target 300KB
      const imageBase64 = await convertToBase64(compressedBlob);
      console.log(imageBase64);
      setState((prev) => ({ ...prev, imageBase64 }));
    } catch (err) {
      console.error("Error during upload process:", err);
    }
  };
  return (
    <div className="card shadow border rounded-lg p-3 ">
      <div className="card-header flex gap-3 items-center mb-3">
        <h2 className="text-xs font-bold">{name}</h2>
        <div>{releaseDate}</div>
      </div>

      <div className="card-content mb-3 h-0 pt-[56.25%] relative">
        <img className="rounded-lg absolute w-full h-full top-0 object-cover" src={imageBase64} alt="" />
      </div>

      <div className="card-footer">
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
          <InputDemo type="file" callback={(e) => handleUpload(e)} className="mb-5" />
          <br />
          <ButtonDemo
            text={`${isLoading ? "Updating..." : "Update Movie"}`}
            className={`w-full mb-3 text-sm`}
            disabled={isLoading}
          />
        </form>
        <ButtonDemo
          text="Delete"
          variant="outline"
          onClick={() => deleteSingleMovie(id)}
          className="w-full"
        />
      </div>
    </div>
  );
};

const AddMovie = () => {
  const [state, setState] = useState({ name: "", releaseDate: 0, imageBase64: "" });
  const [isLoading, setIsLoading] = useState(false);
  const { addMovie } = useApiContext();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { compressImage, convertToBase64 } = useUtil();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addMovie({
      name: state.name,
      releaseDate: state.releaseDate,
      imageBase64: state.imageBase64,
      setIsLoading,
    });
    setState({ name: "", releaseDate: 0, imageBase64: "" });
    if (e.target instanceof HTMLFormElement)   e.target.reset();
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    try {
      const compressedBlob = await compressImage(file, 300); // target 300KB
      const imageBase64 = await convertToBase64(compressedBlob);
      console.log(imageBase64);
      setState((prev) => ({ ...prev, imageBase64 }));
    } catch (err) {
      console.error("Error during upload process:", err);
    }
  };

  return (
    <div className="wrapper  w-full max-w-[360px] mx-auto shadow-lg !p-5 border border-gray-100 rounded-[15px] mb-[100px]">
      <form onSubmit={onSubmit} className="m-5 max-w-[360px] mx-auto add-movie-form ">
        <h2 className="text-2xl text-center mb-5">Add Movie</h2>

        <InputDemo
          label="name"
          placeholder="name"
          name="name"
          type="text"
          callback={(e) => onChange(e)}
          className="mb-5"
          value={state.name}
        />

        <InputDemo
          label="Release date"
          placeholder="Release date"
          name="releaseDate"
          type="number"
          callback={(e) => onChange(e)}
          className="mb-5"
          value={state.releaseDate}
        />

        <InputDemo type="file" callback={(e) => handleUpload(e)} className="mb-5 find-me" />

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
