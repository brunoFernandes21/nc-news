import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ArticleList from "./components/ArticleList";
import { Route, Routes } from "react-router";
import TopicPage from "./components/TopicPage";
import SingleArticle from "./components/SingleArticle";

function App() {
  return (
    <div className="app h-screen flex flex-col justify-between">
      <Navbar />
      <Routes>
        <Route path="/" element={<ArticleList />} />
        <Route path="/articles/:article_id" element={<SingleArticle />} />
        <Route path="/topic" element={<TopicPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
