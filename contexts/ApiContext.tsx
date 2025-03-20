"use client";

import React, { useState, useEffect, createContext, useContext } from "react";
import { db, auth } from "@/config/firebase";
import { collection, getDocs, addDoc, deleteDoc, updateDoc, doc } from "firebase/firestore";

type StateType = {
  // movies: {id: string, name: string, releaseDate: number, receivedAnOscar: boolean, country:string}[]
  movies: { isLoading: boolean; list: { [key: string]: any }[] };
  users: {}[];
};

type ApiContextType = {
  state: StateType;
  setState: (newState: StateType) => void;
  getMovies: ({ setIsLoading }: { [key: string]: any }) => void;
  addMovie: ({ name, releaseDate, setIsLoading }: { [key: string]: any }) => void;
  updateMovie: ({ id, name, releaseDate, setIsLoading }: { [key: string]: any }) => void;
  deleteMovie: ({ id, setIsLoading }: { [key: string]: any }) => void;
};

export const ApiContext = createContext<ApiContextType | null>(null);

export default function ApiProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [state, setState] = useState<StateType>({
    movies: {
      isLoading: false,
      list: [],
    },
    users: [],
  });

  const moviesCollectionRef = collection(db, "movies");

  const getMovies = async ({ setIsLoading = (_: boolean) => {} }) => {
    setIsLoading(true);
    setState((prev) => ({ ...prev, movies: { ...prev.movies, isLoading: true } }));

    try {
      const res = await getDocs(moviesCollectionRef);
      const data = res.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setState((prev) => ({ ...prev, movies: { isLoading: false, list: data } }));
      console.log(data);
    } catch (err) {
      console.error(err, "=getMovies= request error");
    }
    setIsLoading(false);
    setState((prev) => ({ ...prev, movies: { ...prev.movies, isLoading: false } }));
  };

  const addMovie = async ({ name = "", releaseDate = 0, setIsLoading = (_: boolean) => {} }) => {
    setIsLoading(true);
    try {
      const res = await addDoc(moviesCollectionRef, {
        name,
        releaseDate: Number(releaseDate),
        receivedAnOscar: false,
        country: "USA",
        userId: auth?.currentUser?.uid
      });
      getMovies({});
      console.log(res);
    } catch (err) {
      console.error(err, "=addMovie= request error");
    }
    setIsLoading(false);
  };

  const updateMovie = async ({ id = "", name = "", releaseDate = 0, setIsLoading = (_: boolean) => {} }) => {
    setIsLoading(true);
    try {
      const movieDoc = doc(db, "movies", id);
      await updateDoc(movieDoc, {
        name,
        releaseDate: Number(releaseDate),
      });
      getMovies({});
    } catch (err) {
      console.error(err, "=updateMovie= request error");
    }
    setIsLoading(false);
  };

  const deleteMovie = async ({ id = "", setIsLoading = (_: boolean) => {} }) => {
    setIsLoading(true);
    try {
      const movieDoc = doc(db, "movies", id);
      await deleteDoc(movieDoc);
      getMovies({});
    } catch (err) {
      console.error(err, "=deleteMovie= request error");
    }
    setIsLoading(false);
  };

  return (
    <ApiContext.Provider
      value={{
        state,
        ...state,
        setState,
        getMovies,
        addMovie,
        deleteMovie,
        updateMovie,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
}

export const useApiContext = () => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error("useApiContext must be used within an ApiProvider");
  }
  return context;
};
