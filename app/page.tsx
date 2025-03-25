import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description: "Home page description.",
};

export default function Home() {
  return (
    <main className="home-page">
      <div className="container">
        <h1 className="home-page text-3xl">Home page</h1>
      </div>
    </main>
  );
}
